export const SUPPORTED_CHAINS_INFO = [
  {
    chainId: 1,
    chainName: "Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/204406a8342c4a1c9ac7627f2d00a1f1",
  },
  {
    chainId: 4,
    chainName: "Rinkeby",
    rpcUrl: "https://rinkeby.infura.io/v3/204406a8342c4a1c9ac7627f2d00a1f1",
  },
]

export const SUPPORTED_CHAINS = SUPPORTED_CHAINS_INFO.map(c => c.chainId)

export const DEFAULT_CHAIN_ID = 1

export const isSupportedChain = (chainId: number) => SUPPORTED_CHAINS.includes(chainId)

export const getChainName = (chainId: number) =>
  SUPPORTED_CHAINS_INFO.find(({ chainId: id }) => id === chainId)?.chainName

export const getChainUrl = (chainId: number) => SUPPORTED_CHAINS_INFO.find(({ chainId: id }) => id === chainId)?.rpcUrl
