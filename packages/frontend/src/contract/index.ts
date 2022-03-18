import { BigNumber, providers } from "ethers"

import { LPSipherWethKyberAddress, LPSipherWethUniswapAddress, SipherTokenAddress, WETH_ADDRESS } from "@constant"
import { getETHPrice, getSipherPrice } from "src/api/price"

import ERC20 from "./ERC20"
import { LPSipherWethKyber } from "./LPSipherWethKyber"
import { LPSipherWethUniswap } from "./LPSipherWethUniswap"
import { StakingLPSipherWethKyber } from "./StakingLPSipherWethKyber"
import { StakingLPSipherWethUniswap } from "./StakingLPSipherWethUniswap"
import { StakingPool } from "./StakingPool"
import { View } from "./View"
import WETH from "./WETH"

export class ContractCaller {
  provider: providers.Web3Provider
  WETH: WETH
  LPSipherWethUniswap: LPSipherWethUniswap
  LPSipherWethKyber: LPSipherWethKyber
  SipherToken: ERC20
  View: View
  StakingPool: StakingPool
  StakingLPSipherWethKyber: StakingLPSipherWethKyber
  StakingLPSipherWethUniswap: StakingLPSipherWethUniswap

  constructor(provider: any) {
    this.provider = new providers.Web3Provider(provider)
    this.WETH = new WETH(this.provider, WETH_ADDRESS)
    this.View = new View(this.provider)
    this.LPSipherWethUniswap = new LPSipherWethUniswap(this.provider)
    this.LPSipherWethKyber = new LPSipherWethKyber(this.provider)
    this.SipherToken = new ERC20(this.provider, SipherTokenAddress)
    this.StakingPool = new StakingPool(this.provider)
    this.StakingLPSipherWethKyber = new StakingLPSipherWethKyber(this.provider)
    this.StakingLPSipherWethUniswap = new StakingLPSipherWethUniswap(this.provider)
  }

  public async getEtherBalance(from: string): Promise<BigNumber> {
    return await this.provider.getBalance(from)
  }

  public async getLpUniswapTVL() {
    const lpBalance = await this.WETH.getBalance(LPSipherWethUniswapAddress)
    const ethPrice = await getETHPrice()
    const StakedLPPoolETH = lpBalance * ethPrice

    const sipherBalance = await this.SipherToken.getBalance(LPSipherWethUniswapAddress)
    const sipherPrice = await getSipherPrice()
    const StakedLPPoolSipher = sipherBalance * sipherPrice

    return StakedLPPoolETH + StakedLPPoolSipher
  }

  public async getLpKyberTVL() {
    const lpBalance = await this.WETH.getBalance(LPSipherWethKyberAddress)
    const ethPrice = await getETHPrice()
    const StakedLPPoolETH = lpBalance * ethPrice

    const sipherBalance = await this.SipherToken.getBalance(LPSipherWethKyberAddress)
    const sipherPrice = await getSipherPrice()
    const StakedLPPoolSipher = sipherBalance * sipherPrice

    return StakedLPPoolETH + StakedLPPoolSipher
  }

  public async getLpUniswapPrice() {
    const lpPoolTVL = await this.getLpUniswapTVL()

    const totalSupply = await this.LPSipherWethUniswap.totalSupply()
    return lpPoolTVL / totalSupply
  }

  public async getLpKyberPrice() {
    const lpPoolTVL = await this.getLpKyberTVL()
    const totalSupply = await this.LPSipherWethKyber.totalSupply()
    return lpPoolTVL / totalSupply
  }

  public async sign(message: any) {
    const signer = this.provider.getSigner()
    const signature = await signer.signMessage(message)
    return signature
  }
}
