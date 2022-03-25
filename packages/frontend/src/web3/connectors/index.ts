import initInjected from "./injected"
import initWalletConnect from "./walletConnect"

export const connectors = {
  injected: initInjected,
  walletConnect: initWalletConnect,
} as const

export type ConnectorId = keyof typeof connectors
