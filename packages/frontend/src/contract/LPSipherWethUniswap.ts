import { Contract, ethers, providers } from "ethers"

import { LPSipherWethUniswapAddress } from "@constant"
import { weiToEther } from "@utils"
import { LPSipherWethUniswapAbi } from "src/constant/abi"

export class LPSipherWethUniswap {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(LPSipherWethUniswapAddress, LPSipherWethUniswapAbi, provider)
  }

  async getBalance(address: string) {
    const value = await this.contract.balanceOf(address)
    return parseFloat(weiToEther(value))
  }

  async totalSupply() {
    return parseFloat(weiToEther(await this.contract.totalSupply()))
  }
}
