import initCoinbaseConnect from "./coinbase"
import initInjected from "./injected"
import initWalletConnect from "./walletConnect"

export const connectors = {
  injected: initInjected,
  walletConnect: initWalletConnect,
  coinbase: initCoinbaseConnect,
} as const

export type ConnectorId = keyof typeof connectors
