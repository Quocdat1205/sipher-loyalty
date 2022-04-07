import { createContext, useContext, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK } from "@constant"
import { PriceDatas } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useBalance = () => {
  const { scCaller, account, chainId } = useWalletContext()
  const { bearerToken } = useAuth()
  const [isFetched, setIsFetched] = useState(false)
  const qc = useQueryClient()

  const { data: chainBalance } = useQuery(
    ["chainBalance", account],
    () => scCaller.current!.getEtherBalance(account!),
    {
      initialData: 0,
      enabled: !!scCaller.current && !!account,
    },
  )
  const { data: sipher } = useQuery(["sipher", account], () => scCaller.current!.getSipherBalance(account!), {
    initialData: 0,
    enabled: !!scCaller.current && !!account && chainId === ETHEREUM_NETWORK,
  })
  const { data: weth } = useQuery(["weth", account], () => scCaller.current!.getWETHBalance(account!), {
    initialData: 0,
    enabled: !!scCaller.current && !!account && chainId === ETHEREUM_NETWORK,
  })

  const { data: dataPrice } = useQuery(
    "dataPrice",
    () => client.api.priceControllerGetPrice(setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken && !isFetched,
      initialData: {
        sipherPrice: {
          eth: 0,
          usd: 0,
          change: 0,
          circulatingSupply: 0,
          fullyDilutedValuation: 0,
          marketcap: 0,
          marketcapChange: 0,
          maxSupply: 0,
          totalSupply: 0,
        },
        ethereumPrice: {
          eth: 0,
          usd: 0,
          change: 0,
          circulatingSupply: 0,
          fullyDilutedValuation: 0,
          marketcap: 0,
          marketcapChange: 0,
          maxSupply: 0,
          totalSupply: 0,
        },
        maticPrice: {
          eth: 0,
          usd: 0,
          change: 0,
          circulatingSupply: 0,
          fullyDilutedValuation: 0,
          marketcap: 0,
          marketcapChange: 0,
          maxSupply: 0,
          totalSupply: 0,
        },
      },
      onSuccess: () => {
        setIsFetched(true)
      },
    },
  )

  const refetch = () => {
    qc.invalidateQueries(["chainBalance", account])
    qc.invalidateQueries(["sipher", account])
    qc.invalidateQueries(["weth", account])
  }

  const totalETHPrice =
    (chainId === ETHEREUM_NETWORK
      ? dataPrice!.ethereumPrice.eth * chainBalance! + dataPrice!.sipherPrice.eth * sipher!
      : 0) ?? 0

  const totalUsdPrice = totalETHPrice * dataPrice!.ethereumPrice.usd ?? 0

  return {
    dataPrice: dataPrice as PriceDatas,
    totalETHPrice,
    totalUsdPrice,
    balance: {
      chainPrice: chainBalance ?? 0,
      sipher: sipher ?? 0,
      weth: weth ?? 0,
    },
    refetch,
  }
}

const BalanceContext = createContext<ReturnType<typeof useBalance> | null>(null)

export const BalanceProvider: React.FC = ({ children }) => {
  const hook = useBalance()
  return <BalanceContext.Provider value={hook}>{children}</BalanceContext.Provider>
}

export const useBalanceContext = () => {
  const context = useContext(BalanceContext)
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider")
  }
  return context
}
