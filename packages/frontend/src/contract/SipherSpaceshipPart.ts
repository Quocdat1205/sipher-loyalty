import { Contract, ethers, providers } from "ethers"

import { SipherSpaceshipPartAddress } from "@constant"
import { SipherSpaceshipPartAbi } from "src/constant/abi"

export class SipherSpaceshipPart {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(SipherSpaceshipPartAddress, SipherSpaceshipPartAbi, provider)
  }

  async mintBatch(batchID: number[], amount: number[], salt: string, signature: string) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).mintBatch(batchID, amount, salt, signature)
    await tx.wait()
  }

  async mint(batchID: number, amount: number, salt: string, signature: string) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).mint(batchID, amount, salt, signature)
    await tx.wait()
  }
}