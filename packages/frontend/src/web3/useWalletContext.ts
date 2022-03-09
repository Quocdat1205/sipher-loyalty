import { createContext, useContext } from "react"

import useWallet from "./useWallet"

export const WalletContext = createContext<ReturnType<typeof useWallet> | null>(null)

const useWalletContext = () => {
  const walletContext = useContext(WalletContext)

  if (walletContext === null) {
    throw new Error(
      "useWallet() can only be used inside of <UseWalletProvider />, " + "please declare it at a higher level.",
    )
  }

  return walletContext
}

export default useWalletContext
