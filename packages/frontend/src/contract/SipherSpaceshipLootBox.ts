import { Contract, ethers, providers } from "ethers"

import { SipherSpaceshipLootBoxAddress } from "@constant"
import { SipherSpaceshipLootBoxAbi } from "src/constant/abi"

export class SipherSpaceshipLootBox {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(SipherSpaceshipLootBoxAddress, SipherSpaceshipLootBoxAbi, provider)
  }

  async mintBatch(deadline: number, batchID: number[], amount: number[], salt: string, signature: string) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).mintBatch(deadline, batchID, amount, salt, signature)
    await tx.wait()
  }

  async mint(deadline: number, batchID: number, amount: number, salt: string, signature: string) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).mint(deadline, batchID, amount, salt, signature)
    await tx.wait()
  }

  async cancelOrder(signature: string) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).cancelOrder(signature)
    await tx.wait()
  }
}
