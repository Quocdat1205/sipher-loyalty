import { ReactNode } from "react"

import useWallet from "./useWallet"
import { WalletContext } from "./useWalletContext"

interface UseWalletProviderProps {
  children: ReactNode
}

const UseWalletProvider = ({ children }: UseWalletProviderProps) => {
  const wallet = useWallet()

  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
}

export default UseWalletProvider
