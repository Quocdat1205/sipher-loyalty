import { Contract, ethers, providers } from "ethers"

import { SipherAirdropsAddress } from "@constant"
import { weiToEther } from "@utils"
import { AIRDROPS_ABI } from "src/constant/abi"

export class SipherAirdrops {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(SipherAirdropsAddress, AIRDROPS_ABI, provider)
  }

  async claim(totalAmount: string, proof: string[]) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).claim(totalAmount, proof)
    await tx.wait()
  }

  async claimed(from: string) {
    return weiToEther(await this.contract.claimed("0", from))
  }

  async getClaimableAmountAtTimestamp(from: string, totalAmount: string, proof: string[]) {
    return weiToEther(
      await this.contract.getClaimableAmountAtTimestamp(
        from,
        totalAmount,
        proof,
        Math.floor(new Date().getTime() / 1000).toString(),
      ),
    )
  }
}
