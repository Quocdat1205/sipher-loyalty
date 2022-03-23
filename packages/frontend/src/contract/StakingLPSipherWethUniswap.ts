import { Contract, ethers, providers } from "ethers"

import { StakingLPSipherWethUniswapAddress } from "@constant"
import { weiToEther } from "@utils"
import { StakingLPSipherWethUniswapAbi } from "src/constant/abi"

export class StakingLPSipherWethUniswap {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(StakingLPSipherWethUniswapAddress, StakingLPSipherWethUniswapAbi, provider)
  }

  async totalSupply() {
    return weiToEther(await this.contract.totalSupply())
  }
}
