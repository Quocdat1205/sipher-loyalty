import { Contract, ethers, providers } from "ethers"

import { LPSipherWethKyberAddress } from "@constant"
import { weiToEther } from "@utils"
import { LPSipherWethKyberAbi } from "src/constant/abi"

export class LPSipherWethKyber {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(LPSipherWethKyberAddress, LPSipherWethKyberAbi, provider)
  }

  async getBalance(address: string) {
    const value = await this.contract.balanceOf(address)
    return weiToEther(value)
  }

  async totalSupply() {
    return weiToEther(await this.contract.totalSupply())
  }
}
