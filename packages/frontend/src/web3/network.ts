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
  {
    chainId: 137,
    rpcUrls: ["https://rpc-mainnet.matic.network/"],
    chainName: "Matic Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  {
    chainId: 80001,
    chainName: "Mumbai Testnet",
    rpcUrls: ["https://rpc-mumbai.matic.today"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
]

export const SUPPORTED_CHAINS = SUPPORTED_CHAINS_INFO.map(({ chainId }) => chainId)

export const DEFAULT_CHAIN_ID = 1

export const isSupportedChain = (chainId: number) => SUPPORTED_CHAINS.includes(chainId)

export const getChainName = (chainId: number) =>
  SUPPORTED_CHAINS_INFO.find(({ chainId: id }) => id === chainId)?.chainName

export const getChainUrl = (chainId: number) => SUPPORTED_CHAINS_INFO.find(({ chainId: id }) => id === chainId)?.rpcUrl
