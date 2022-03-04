import Web3 from "web3"
import constant from "@setting/constant"

export class NftContract {
  web3: Web3
  contract: any
  randomizedIndex: number
  constructor({ abi, contract }: { abi: any; contract: string }) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(constant.SC_INFURA))
    this.contract = new this.web3.eth.Contract(abi, contract)
    this.contract.methods
      .randomizedStartIndex()
      .call()
      .then((res: string) => parseInt(res))
      .then((index: number) => {
        this.randomizedIndex = index
      })
  }

  addAccountByPrivateKey(privateKey: string) {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
    this.web3.eth.accounts.wallet.add(account)
  }

  async setRandomizedStartIndex() {
    this.randomizedIndex = parseInt(await this.contract.methods.randomizedStartIndex().call())
  }

  async ownerOf(id: number): Promise<string> {
    return await this.contract.methods.ownerOf(id).call()
  }

  async balanceOf(address: string) {
    return parseInt(await this.contract.methods.balanceOf(address).call())
  }

  async _tokenOfOwnerByIndex(address: string, index: number) {
    return parseInt(await this.contract.methods.tokenOfOwnerByIndex(address, index).call())
  }

  async getNFTId(address: string, index: number) {
    const tokenId = await this._tokenOfOwnerByIndex(address, index)
    const NFTId = ((tokenId + this.randomizedIndex - 2 + 10000) % 10000) + 1
    return NFTId
  }

  getIndexFromId(id: number) {
    return (id - this.randomizedIndex + 1 + 10000) % 10000
  }

  getNftIdFromTokenId(tokenId: number) {
    return ((tokenId - 2 + this.randomizedIndex) % 10000) + 1
  }

  async getOwnerOf(index: number) {
    return await this.contract.methods.ownerOf(index).call()
  }
}
