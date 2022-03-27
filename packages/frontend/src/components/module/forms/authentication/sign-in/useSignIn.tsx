import { createContext, FC, useContext, useEffect, useState } from "react"
import { useAuthFlowStore } from "@store"
import { useWalletContext } from "@web3"

const useSignIn = () => {
  const [email, setEmail] = useState("")

  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  const wallet = useWalletContext()

  useEffect(() => {
    if (flowState === null) setEmail("")
  }, [flowState])

  return {
    email,
    setEmail,
    flowState,
    setFlowState,
    wallet,
  }
}

const UseSignInContext = createContext<ReturnType<typeof useSignIn> | null>(null)

export const UseSignInProvider: FC = ({ children }) => {
  const value = useSignIn()

  return <UseSignInContext.Provider value={value}>{children}</UseSignInContext.Provider>
}

export const useSignInContext = () => {
  const context = useContext(UseSignInContext)

  if (!context) {
    throw new Error("useSignUpContext must be used within a UseSignUpProvider")
  }

  return context
}

export default useSignIn
