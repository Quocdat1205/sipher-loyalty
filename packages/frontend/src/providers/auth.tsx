import { createContext, FC, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import AtherIdAuth, {
  AtherIdEnviromment,
  CognitoUser,
  CognitoUserSession,
  configure,
  getClient,
  Hub,
} from "@sipher.dev/ather-id"

import { getProfile } from "@api"

const configPromise = configure({
  environment: (process.env.NEXT_PUBLIC_ATHER_ID_URL as any) ?? AtherIdEnviromment.Dev,
  oauth: {
    redirectSignIn:
      process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_DASHBOARD_FE_URL}` : "http://localhost:3000/",
    redirectSignOut:
      process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_DASHBOARD_FE_URL}` : "http://localhost:3000/",
  },
})

const useAuthState = () => {
  const userRef = useRef<CognitoUser>()
  const [cognitoUser, _setUser] = useState<CognitoUser>()
  const authenticated = useMemo(() => !!cognitoUser, [cognitoUser])
  const sessionRef = useRef<CognitoUserSession>()
  const [session, _setSession] = useState<CognitoUserSession>()
  const sessionRefreshRef = useRef<NodeJS.Timeout>()

  const user = useMemo(() => {
    if (!session) return undefined

    const email = session.getIdToken().payload["custom:original_email"] || session.getIdToken().payload.email
    const userId = session.getIdToken().payload["custom:user_id"]

    return { email, userId }
  }, [session])

  const setUser = (obj?: CognitoUser) => {
    userRef.current = obj
    _setUser(obj)
  }

  const getUser = async () => {
    const currentUser = await AtherIdAuth.currentAuthenticatedUser().catch(err => {
      console.log("AUTH ERROR:", err)
    })
    return currentUser
  }

  const setSession = (obj?: CognitoUserSession) => {
    sessionRef.current = obj
    _setSession(obj)
  }

  const getSession = async (): Promise<CognitoUserSession | undefined> =>
    userRef.current &&
    new Promise(resolve => {
      userRef.current?.getSession((err: Error, _session: CognitoUserSession | null) => {
        if (err) {
          console.error("Failed to refresh session", err)
        }
        resolve(_session || undefined)
      })
    })

  const signOut = async () => {
    await AtherIdAuth.signOut()
    setUser(undefined)
    setSession(undefined)
  }

  const bearerToken = session?.getIdToken().getJwtToken() ?? ""

  const { data: userProfile } = useQuery("profile", () => getProfile(bearerToken), {
    enabled: !!bearerToken && authenticated,
  })

  const { data: ownedWallets, refetch: refetchOwnedWallets } = useQuery(
    "owned-wallets",
    () => AtherIdAuth.ownedWallets(),
    {
      enabled: authenticated,
    },
  )

  useEffect(() => {
    const client = getClient()
    client.instance.interceptors.request.use(async config => {
      const session = await getSession()
      const authorization = `Bearer ${session?.getIdToken()?.getJwtToken()}`
      config.headers = {
        ...config.headers,
        authorization,
      }

      return config
    })

    const unsubscribe = Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then(setUser)
          break
        case "signOut":
          setUser(undefined)
          break
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data)
          break
      }
    })

    sessionRefreshRef.current = setInterval(() => {
      // try to refresh token every 10 mins
      getSession().then(setSession)
    }, 10 * 60 * 1000)
    Promise.resolve(configPromise).then(getUser).then(setUser).then(getSession).then(setSession)

    return () => {
      unsubscribe()
      clearInterval(sessionRefreshRef.current as any)
    }
  }, [])

  useEffect(() => {
    if (cognitoUser) getSession().then(setSession)
  }, [cognitoUser])

  return {
    authenticated,
    session,
    user,
    cognitoUser,
    signOut,
    setUser,
    userProfile,
    ownedWallets: ownedWallets ? ownedWallets!.map(w => w.address) : [],
    bearerToken,
    refetchOwnedWallets,
    getUser,
  }
}

const authContext = createContext<ReturnType<typeof useAuthState> | null>(null)

const { Provider } = authContext

declare global {
  interface Window {
    gtag: any
  }
}

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuthState()

  const router = useRouter()

  const { authenticated, cognitoUser } = auth

  useEffect(() => {
    if (typeof window.gtag !== "undefined" && cognitoUser) {
      const user_id = cognitoUser.getSignInUserSession()?.getIdToken()?.payload?.["custom:user_id"]
      window.gtag("config", "G-3RDSG9HN4G", { user_id })
      window.gtag("set", "user_properties", { ather_id: user_id })
    }
  }, [cognitoUser])

  useEffect(() => {
    if (router.isReady) {
      const currentRoute = router.asPath.split("?")[0]
      const isAuthRoute = ["/signin", "/signup", "/forgot-password"].includes(currentRoute)
      // move user inside after authenticated
      if (authenticated && ["/signin", "/forgot-password"].includes(currentRoute)) {
        const next = decodeURIComponent((router.query["next"] as string) || "/")
        const [pathname, search] = next.split("?")
        router.push({ pathname, search })
      }

      if (!authenticated && !isAuthRoute) {
        const next = encodeURIComponent(currentRoute)
        router.push(`${"/signin"}?next=${next}`)
      }
    }
  }, [authenticated, router.asPath, router.isReady])

  return <Provider value={auth}>{children}</Provider>
}

export const useAuth = () => {
  const auth = useContext(authContext)
  if (!auth) {
    throw new Error("useAuth must be used inside an AuthProvider")
  }

  return auth
}
