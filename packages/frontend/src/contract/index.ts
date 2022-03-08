import { BigNumber, BigNumberish, providers, utils } from "ethers"

import { SipherTokenAddress } from "@constant"

import ERC20 from "./ERC20"

export const weiToEther = (balance: BigNumberish) => {
  const actualValue = parseFloat(utils.formatEther(balance))
  return actualValue
}

export class ContractCaller {
  provider: providers.Web3Provider
  SipherToken: ERC20

  constructor(provider: any) {
    this.provider = new providers.Web3Provider(provider)
    this.SipherToken = new ERC20(this.provider, SipherTokenAddress)
  }

  public async getEtherBalance(from: string): Promise<BigNumber> {
    const balance = await this.provider.getBalance(from)
    return balance
  }

  public async sign(message: any): Promise<string> {
    const signer = this.provider.getSigner()
    const signature = await signer.signMessage(message)
    return signature
  }
}
