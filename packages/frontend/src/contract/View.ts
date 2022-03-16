import { Contract, ethers, providers } from "ethers"

import { ViewAbi, ViewAddress } from "@constant"
import { weiToEther } from "@utils"

export interface Pool {
  accountClaimedRewards: string
  accountPendingRewards: string
  accountPoolShares: string
  accountTotalDeposit: string
  depositToken: string
  deposits: Record<"amount" | "start" | "end", number>[]
  poolAddress: string
  totalPoolShares: string
  weight: string
}

export interface IView {
  pendingRewards: string
  StakingPools: Pool
  StakingLPSipherWethUniswap: Pool
  StakingLPSipherWethKyber: Pool
  escrowPool: Pool
  totalWeight: string
}

export class View {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(ViewAddress, ViewAbi, provider)
  }

  public async fetchData(address: string): Promise<IView> {
    const data = await this.contract.fetchData(address)
    const sipherPoolData = data.pools[0]
    const lpUniswapPoolData = data.pools[1]
    const lpKyberPoolData = data.pools[2]
    const escrowPool = data.escrowPool
    return {
      pendingRewards: weiToEther(data.pendingRewards),
      StakingPools: {
        accountClaimedRewards: weiToEther(sipherPoolData.accountClaimedRewards),
        accountPendingRewards: weiToEther(sipherPoolData.accountPendingRewards),
        accountPoolShares: weiToEther(sipherPoolData.accountPoolShares),
        accountTotalDeposit: weiToEther(sipherPoolData.accountTotalDeposit),
        depositToken: sipherPoolData.depositToken,
        deposits: sipherPoolData.deposits.map(deposit => ({
          amount: weiToEther(deposit.amount),
          start: parseInt(deposit.start) * 1000,
          end: parseInt(deposit.end) * 1000,
        })),
        poolAddress: sipherPoolData.poolAddress,
        totalPoolShares: weiToEther(sipherPoolData.totalPoolShares),
        weight: weiToEther(sipherPoolData.weight),
      },
      StakingLPSipherWethUniswap: {
        accountClaimedRewards: weiToEther(lpUniswapPoolData.accountClaimedRewards),
        accountPendingRewards: weiToEther(lpUniswapPoolData.accountPendingRewards),
        accountPoolShares: weiToEther(lpUniswapPoolData.accountPoolShares),
        accountTotalDeposit: weiToEther(lpUniswapPoolData.accountTotalDeposit),
        depositToken: lpUniswapPoolData.depositToken,
        deposits: lpUniswapPoolData.deposits.map(deposit => ({
          amount: weiToEther(deposit.amount),
          start: parseInt(deposit.start) * 1000,
          end: parseInt(deposit.end) * 1000,
        })),
        poolAddress: lpUniswapPoolData.poolAddress,
        totalPoolShares: weiToEther(lpUniswapPoolData.totalPoolShares),
        weight: weiToEther(lpUniswapPoolData.weight),
      },
      StakingLPSipherWethKyber: {
        accountClaimedRewards: weiToEther(lpKyberPoolData.accountClaimedRewards),
        accountPendingRewards: weiToEther(lpKyberPoolData.accountPendingRewards),
        accountPoolShares: weiToEther(lpKyberPoolData.accountPoolShares),
        accountTotalDeposit: weiToEther(lpKyberPoolData.accountTotalDeposit),
        depositToken: lpKyberPoolData.depositToken,
        deposits: lpKyberPoolData.deposits.map(deposit => ({
          amount: weiToEther(deposit.amount),
          start: parseInt(deposit.start) * 1000,
          end: parseInt(deposit.end) * 1000,
        })),
        poolAddress: lpKyberPoolData.poolAddress,
        totalPoolShares: weiToEther(lpKyberPoolData.totalPoolShares),
        weight: weiToEther(lpKyberPoolData.weight),
      },
      escrowPool: {
        accountClaimedRewards: weiToEther(escrowPool.accountClaimedRewards),
        accountPendingRewards: weiToEther(escrowPool.accountPendingRewards),
        accountPoolShares: weiToEther(escrowPool.accountPoolShares),
        accountTotalDeposit: weiToEther(escrowPool.accountTotalDeposit),
        depositToken: escrowPool.depositToken,
        deposits: escrowPool.deposits.map(deposit => ({
          amount: weiToEther(deposit.amount),
          start: parseInt(deposit.start) * 1000,
          end: parseInt(deposit.end) * 1000,
        })),
        poolAddress: escrowPool.poolAddress,
        totalPoolShares: weiToEther(escrowPool.totalPoolShares),
        weight: weiToEther(escrowPool.weight),
      },
      totalWeight: weiToEther(data.totalWeight),
    }
  }
}
