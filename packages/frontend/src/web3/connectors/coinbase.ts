import { WalletLinkConnector } from "@web3-react/walletlink-connector"

import { SUPPORTED_CHAINS } from "../network"
import { Connector } from "../types"

const RPC_URLS: { [chainId: number]: string } = {
  1: `https://mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd`,
  4: `https://mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd`,
  137: `https://polygon-mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd`,
  80001: `https://polygon-mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd`,
}

const initCoinbaseConnect = (): Connector => {
  const web3ReactConnector = () => {
    return new WalletLinkConnector({
      url: RPC_URLS[1],
      appName: "ATHERLABS LOYALTY",
      supportedChainIds: [...SUPPORTED_CHAINS],
    })
  }

  return {
    web3ReactConnector: web3ReactConnector(),
  }
}

export default initCoinbaseConnect
