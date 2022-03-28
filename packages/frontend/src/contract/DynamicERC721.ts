import { ethers, providers } from "ethers"

import { ERC721_ABI } from "../constant"

class DynamicERC721 {
  provider: providers.Web3Provider

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
  }

  public getContract = (contractAddress: string) => {
    return new ethers.Contract(contractAddress, ERC721_ABI, this.provider)
  }

  async balanceOf(contractAddress: string, address: string): Promise<number> {
    return await this.getContract(contractAddress).balanceOf(address)
  }

  async tokenOfOwnerByIndex(contractAddress: string, owner: string, index: number): Promise<number> {
    return await this.getContract(contractAddress).tokenOfOwnerByIndex(owner, index)
  }

  async isApprovedForAll(contractAddress: string, target: string): Promise<boolean> {
    const ownerAddress = await this.provider.getSigner().getAddress()
    return await this.getContract(contractAddress).isApprovedForAll(ownerAddress, target)
  }

  async setApprovalForAll(contractAddress: string, target: string) {
    const signer = this.provider.getSigner()
    const contract = this.getContract(contractAddress)
    const tx = await contract.connect(signer).setApprovalForAll(target, true)
    await tx.wait()
  }

  async transfer(contractAddress: string, addressTo: string, tokenId: string) {
    const signer = this.provider.getSigner()
    const publicAddress = await signer.getAddress()
    const contract = this.getContract(contractAddress)
    const tx = await contract.connect(signer).transferFrom(publicAddress, addressTo, tokenId)
    await tx.wait()
  }
}

export default DynamicERC721
