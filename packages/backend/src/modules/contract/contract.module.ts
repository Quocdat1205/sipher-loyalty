import Web3 from "web3"
import constant from "@setting/constant"

export class NftContract {
  web3: Web3

  contract: any

  constructor({ abi, contract }: { abi: any; contract: string }) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(constant.SC_INFURA))
    this.contract = new this.web3.eth.Contract(abi, contract)
  }

  addAccountByPrivateKey(privateKey: string) {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
    this.web3.eth.accounts.wallet.add(account)
  }

  async ownerOf(id: number): Promise<string> {
    return (await this.contract.methods.ownerOf(id).call()).toString()
  }

  async balanceOf(address: string) {
    return parseInt(await this.contract.methods.balanceOf(address).call(), 10)
  }

  async _tokenOfOwnerByIndex(address: string, index: number) {
    return parseInt(await this.contract.methods.tokenOfOwnerByIndex(address, index).call(), 10)
  }

  async getOwnerOf(index: number) {
    return (await this.contract.methods.ownerOf(index).call()).toString()
  }
}
