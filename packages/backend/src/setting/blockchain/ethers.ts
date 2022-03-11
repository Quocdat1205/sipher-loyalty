import { Contract, providers } from "ethers"
import constant, { Chain } from "@setting/constant"

const providerInstances: { [k in Chain]?: providers.Provider } = {}

export const getProvider = (chain: Chain) => {
  if (!providerInstances[chain]) {
    providerInstances[chain] = new providers.StaticJsonRpcProvider(constant.blockchain.rpcUrls[chain], chain)
  }

  return providerInstances[chain]
}

export const getContract = (address: string, abi: any, provider?: providers.Provider) =>
  new Contract(address, abi, provider)
