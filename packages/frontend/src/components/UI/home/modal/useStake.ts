import { useQuery } from "react-query"
import { useWalletContext } from "@web3"

import { TOTAL_REWARDS_FOR_POOL } from "@constant"
import { useLpKyberPrice, useLpUniswapPrice, useSipherPrice } from "src/api/price"

export const useStake = () => {
  const { scCaller, account } = useWalletContext()

  const sipherPrice = useSipherPrice()
  const lpUniswapPrice = useLpUniswapPrice()
  const lpKyberPrice = useLpKyberPrice()

  const { data: dataFetch } = useQuery(["fetch", account], () => scCaller.current!.View.fetchData(account!), {
    enabled: !!scCaller.current && !!account,
  })

  const { data: stakePoolTotalSupply } = useQuery(
    "stake-pool-total-supply",
    () => scCaller.current!.StakingPool.totalSupply(),
    {
      initialData: 1,
    },
  )

  const { data: lpUniswapPoolTotalSupply } = useQuery(
    "lp-uniswap-pool-total-supply",
    () => scCaller.current!.StakingLPSipherWethUniswap.totalSupply(),
    {
      initialData: 1,
      enabled: !!scCaller.current,
    },
  )

  const { data: lpKyberPoolTotalSupply } = useQuery(
    "lp-kyber-pool-total-supply",
    () => scCaller.current!.StakingLPSipherWethKyber.totalSupply(),
    {
      initialData: 1,
      enabled: !!scCaller.current,
    },
  )

  const stakingPoolInfos = [
    {
      poolName: "$SIPHER",
      APR: !dataFetch
        ? 0
        : (((dataFetch.StakingPools.weight / dataFetch.totalWeight) * TOTAL_REWARDS_FOR_POOL) / stakePoolTotalSupply!) *
          2,
      onStake: () => window.open("https://sipher.xyz/stake/deposit/sipher", "_blank"),
    },
    {
      poolName: "Uniswap LP $SIPHER-ETH",
      APR: !dataFetch
        ? 0
        : (((dataFetch.StakingLPSipherWethUniswap.weight / dataFetch.totalWeight) *
            TOTAL_REWARDS_FOR_POOL *
            sipherPrice) /
            (lpUniswapPoolTotalSupply! * lpUniswapPrice)) *
          2,
      onStake: () => window.open("https://sipher.xyz/stake/deposit/uniswap-lp-sipher-eth", "_blank"),
    },
    {
      poolName: "Kyber SLP $SIPHER-ETH",
      APR: !dataFetch
        ? 0
        : (((dataFetch.StakingLPSipherWethKyber.weight / dataFetch.totalWeight) *
            TOTAL_REWARDS_FOR_POOL *
            sipherPrice) /
            (lpKyberPoolTotalSupply! * lpKyberPrice)) *
          2,
      onStake: () => window.open("https://sipher.xyz/stake/deposit/kyber-slp-sipher-eth", "_blank"),
    },
  ]

  return {
    stakingPoolInfos,
  }
}
