import { UserRejectedRequestError, WalletConnectConnector } from "@web3-react/walletconnect-connector"

import { ConnectionRejectedError } from "../errors"
import { SUPPORTED_CHAINS } from "../network"
import { Connector } from "../types"

const initWalletConnect = (): Connector => {
  const web3ReactConnector = () =>
    new WalletConnectConnector({
      qrcode: true,
      infuraId: "8e3937db21b341ceac1607d35ae551dd",
      supportedChainIds: SUPPORTED_CHAINS,
    })
  const handleActivationError = (err: Error) =>
    err instanceof UserRejectedRequestError ? new ConnectionRejectedError() : null
  return {
    web3ReactConnector: web3ReactConnector(),
    handleActivationError,
  }
}

export default initWalletConnect
