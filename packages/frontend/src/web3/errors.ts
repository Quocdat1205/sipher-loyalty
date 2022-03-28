export class ConnectionRejectedError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = "Connection rejected error"
    this.message = `The activation has been rejected by the provider.`
  }
}

export class NoMetaMaskError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = "MetaMask not found"
    this.message = "Please install MetaMask and try again."
  }
}
