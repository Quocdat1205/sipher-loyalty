import React from "react"

export const MetaMaskContext = React.createContext<any>(null)

export const useMetaMask = () => {
  const context = React.useContext(MetaMaskContext)

  if (context === undefined) {
    throw new Error("UseMetamask hook must be used with a MetaMask Provider component")
  }
  return context
}

export default useMetaMask
