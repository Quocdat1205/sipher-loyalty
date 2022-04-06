import { BigNumber, providers } from "ethers"

import { SIPHER_TOKEN_ABI, SipherTokenAddress, WETH_ADDRESS } from "@constant"
import { weiToEther } from "@utils"

import DynamicERC721 from "./DynamicERC721"
import DynamicERC1155 from "./DynamicERC1155"
import ERC20 from "./ERC20"
import { LPSipherWethKyber } from "./LPSipherWethKyber"
import { LPSipherWethUniswap } from "./LPSipherWethUniswap"
import { SipherAirdrops } from "./SipherAirdrops"
import { SipherSpaceshipLootBox } from "./SipherSpaceshipLootBox"
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
  SipherSpaceshipLootBox: SipherSpaceshipLootBox
  SipherAirdrops: SipherAirdrops
  DynamicERC721: DynamicERC721
  DynamicERC1155: DynamicERC1155

  constructor(provider: any) {
    this.provider = new providers.Web3Provider(provider)
    this.WETH = new WETH(this.provider, WETH_ADDRESS)
    this.View = new View(this.provider)
    this.LPSipherWethUniswap = new LPSipherWethUniswap(this.provider)
    this.LPSipherWethKyber = new LPSipherWethKyber(this.provider)
    this.SipherToken = new ERC20(this.provider, SipherTokenAddress, SIPHER_TOKEN_ABI)
    this.StakingPool = new StakingPool(this.provider)
    this.StakingLPSipherWethKyber = new StakingLPSipherWethKyber(this.provider)
    this.StakingLPSipherWethUniswap = new StakingLPSipherWethUniswap(this.provider)
    this.SipherSpaceshipLootBox = new SipherSpaceshipLootBox(this.provider)
    this.SipherAirdrops = new SipherAirdrops(this.provider)
    this.DynamicERC721 = new DynamicERC721(this.provider)
    this.DynamicERC1155 = new DynamicERC1155(this.provider)
  }

  public async getEtherBalance(from: string) {
    const balance: BigNumber = await this.provider.getBalance(from)
    return weiToEther(balance.toString())
  }

  public async getSipherBalance(from: string) {
    const balance = await this.SipherToken.getBalance(from)
    return balance
  }

  public async getWETHBalance(from: string) {
    const balance = await this.WETH.getBalance(from)
    return weiToEther(balance.toString())
  }

  // public async getLpUniswapTVL() {
  //   const lpBalance = await this.WETH.getBalance(LPSipherWethUniswapAddress)
  //   const ethPrice = await getETHPrice()
  //   const StakedLPPoolETH = lpBalance * ethPrice

  //   const sipherBalance = await this.SipherToken.getBalance(LPSipherWethUniswapAddress)
  //   const sipherPrice = await getSipherPrice()
  //   const StakedLPPoolSipher = sipherBalance * sipherPrice

  //   return StakedLPPoolETH + StakedLPPoolSipher
  // }

  // public async getLpKyberTVL() {
  //   const lpBalance = await this.WETH.getBalance(LPSipherWethKyberAddress)
  //   const ethPrice = await getETHPrice()
  //   const StakedLPPoolETH = lpBalance * ethPrice

  //   const sipherBalance = await this.SipherToken.getBalance(LPSipherWethKyberAddress)
  //   const sipherPrice = await getSipherPrice()
  //   const StakedLPPoolSipher = sipherBalance * sipherPrice

  //   return StakedLPPoolETH + StakedLPPoolSipher
  // }

  // public async getLpUniswapPrice() {
  //   const lpPoolTVL = await this.getLpUniswapTVL()

  //   const totalSupply = await this.LPSipherWethUniswap.totalSupply()
  //   return lpPoolTVL / totalSupply
  // }

  // public async getLpKyberPrice() {
  //   const lpPoolTVL = await this.getLpKyberTVL()
  //   const totalSupply = await this.LPSipherWethKyber.totalSupply()
  //   return lpPoolTVL / totalSupply
  // }

  public async sign(message: any) {
    const signer = this.provider.getSigner()
    const signature = await signer.signMessage(message)
    return signature
  }
}
