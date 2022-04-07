export type metamask = {
  Connect: any
  DisConnect: any
  active: boolean
  account: string | undefined | null
  library: any
}

export type publicAddress = {
  publicAddress: string
}

export type signWallet = {
  publicAddress: string
  signature: string
}
