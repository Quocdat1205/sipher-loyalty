import { Contract, ethers, providers } from "ethers"

import { StakingLPSipherWethKyberAddress } from "@constant"
import { weiToEther } from "@utils"
import { StakingLPSipherWethKyberAbi } from "src/constant/abi"

export class StakingLPSipherWethKyber {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(StakingLPSipherWethKyberAddress, StakingLPSipherWethKyberAbi, provider)
  }

  async totalSupply() {
    return parseFloat(weiToEther(await this.contract.totalSupply()))
  }
}
