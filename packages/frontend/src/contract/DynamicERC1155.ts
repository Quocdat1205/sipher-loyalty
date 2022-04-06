import { ethers, providers } from "ethers"

import { ERC1155_ABI } from "../constant"

interface TransferType {
  contractAddress: string
  addressTo: string
  tokenId: string
  amount: string
}

class DynamicERC1155 {
  provider: providers.Web3Provider

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
  }

  public getContract = (contractAddress: string) => {
    return new ethers.Contract(contractAddress, ERC1155_ABI, this.provider)
  }

  async balanceOf(contractAddress: string, address: string): Promise<number> {
    return await this.getContract(contractAddress).balanceOf(address)
  }

  async transfer({ contractAddress, addressTo, tokenId, amount }: TransferType) {
    const signer = this.provider.getSigner()
    const publicAddress = await signer.getAddress()
    const contract = this.getContract(contractAddress)
    const tx = await contract.connect(signer).safeTransferFrom(publicAddress, addressTo, tokenId, amount, "0x")
    await tx.wait()
  }
}

export default DynamicERC1155
