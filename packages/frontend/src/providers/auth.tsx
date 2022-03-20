import { createContext, FC, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import AtherIdAuth, {
  AtherIdEnviromment,
  CognitoUser,
  CognitoUserSession,
  configure,
  getClient,
  Hub,
} from "@sipher.dev/ather-id"
import { useWalletContext } from "@web3"

const configPromise = configure({
  environment: (process.env.NEXT_PUBLIC_ATHER_ID_URL as any) ?? AtherIdEnviromment.Dev,
  oauth: {
    redirectSignIn: "http://localhost:3000/",
    redirectSignOut: "http://localhost:3000/",
  },
})

const useAuthState = () => {
  const wallet = useWalletContext()

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

  const getUser = async () =>
    AtherIdAuth.currentAuthenticatedUser().catch(err => {
      console.log("not authenticated", err)
    })

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
    wallet.reset()
  }

  useEffect(() => {
    const client = getClient()
    client.instance.interceptors.request.use(async config => {
      const session = await getSession()
      // console.log('session', session, session?.getIdToken()?.getJwtToken());
      const authorization = `Bearer ${session?.getIdToken()?.getJwtToken()}`
      config.headers = {
        ...config.headers,
        authorization,
      }

      return config
    })

    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
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

  return { authenticated, session, user, cognitoUser, signOut, setUser }
}

export type UseAuthState = ReturnType<typeof useAuthState>

const authContext = createContext<UseAuthState | null>(null)

const { Provider } = authContext

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuthState()
  // const router = useRouter()

  // const { authenticated } = auth

  // useEffect(() => {
  //   const isLoginRoute = router.pathname === "/login"
  //   console.log("authenticated", authenticated, "isLoginRoute", isLoginRoute)
  //   if (!authenticated && !isLoginRoute) {
  //     const next = encodeURIComponent(router.route)
  //     console.log("push route", `${"/login"}?next=${next}`)
  //     router.push(`${"/login"}?next=${next}`)
  //   } else if (authenticated && isLoginRoute) {
  //     const next = decodeURIComponent((router.query["next"] as string) || "/")
  //     const [pathname, search] = next.split("?")
  //     console.log("push route", { pathname, search })
  //     router.push({ pathname, search })
  //   }
  // }, [authenticated, router.pathname])

  return <Provider value={auth}>{children}</Provider>
}

export const useAuth = () => {
  const auth = useContext(authContext)
  if (!auth) {
    throw new Error("useAuth must be used inside an AuthProvider")
  }

  return auth
}
