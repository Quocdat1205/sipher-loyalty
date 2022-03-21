import { createContext, FC, useContext, useState } from "react"
import { CognitoUser } from "amazon-cognito-identity-js"

export type User = {
  username: string
  email: string
}

const useSignInContextValue = () => {
  const [user, setUser] = useState<CognitoUser>()

  return { user, setUser }
}

const signInContext = createContext<ReturnType<typeof useSignInContextValue> | null>(null)

const { Provider } = signInContext

export const SignInProvider: FC = ({ children }) => {
  const value = useSignInContextValue()

  return <Provider value={value}>{children}</Provider>
}

export const useSignInContext = () => {
  const ctx = useContext(signInContext)
  if (!ctx) {
    throw new Error("useSignInContext must be used inside an SignInProvider")
  }

  return ctx
}

export default useSignInContext
