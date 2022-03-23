import { Contract, ethers, providers } from "ethers"

import { StakingPoolAddress } from "@constant"
import { weiToEther } from "@utils"
import { StakingPoolAbi } from "src/constant/abi"

export class StakingPool {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(StakingPoolAddress, StakingPoolAbi, provider)
  }

  async totalSupply() {
    return weiToEther(await this.contract.totalSupply())
  }
}
