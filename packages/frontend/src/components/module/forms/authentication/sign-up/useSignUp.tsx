import { createContext, FC, useContext, useEffect, useState } from "react"
import { useAuthFlowStore } from "@store"
import { useWalletContext } from "@web3"

const useSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isConnectWalletFirst, setIsConnectWalletFirst] = useState(false)

  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  const wallet = useWalletContext()

  useEffect(() => {
    if (flowState === null) {
      setEmail("")
      setPassword("")
      setIsConnectWalletFirst(false)
    }
  }, [flowState])

  return {
    email,
    password,
    setEmail,
    setPassword,
    isConnectWalletFirst,
    setIsConnectWalletFirst,
    flowState,
    setFlowState,
    wallet,
  }
}

const UseSignUpContext = createContext<ReturnType<typeof useSignUp> | null>(null)

export const UseSignUpProvider: FC = ({ children }) => {
  const value = useSignUp()

  return <UseSignUpContext.Provider value={value}>{children}</UseSignUpContext.Provider>
}

export const useSignUpContext = () => {
  const context = useContext(UseSignUpContext)

  if (!context) {
    throw new Error("useSignUpContext must be used within a UseSignUpProvider")
  }

  return context
}

export default useSignUp
