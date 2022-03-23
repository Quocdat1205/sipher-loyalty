import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from "@web3-react/injected-connector"

import { ConnectionRejectedError, NoMetaMaskError } from "../errors"
import { SUPPORTED_CHAINS } from "../network"
import { Connector } from "../types"

// Injected is actually MetaMask Extension
const initInjected = (): Connector => ({
  web3ReactConnector: new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS }),
  handleActivationError: (err: Error) =>
    err instanceof UserRejectedRequestError
      ? new ConnectionRejectedError()
      : err instanceof NoEthereumProviderError
      ? new NoMetaMaskError()
      : null,
})

export default initInjected
