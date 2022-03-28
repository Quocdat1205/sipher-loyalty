import { createContext, useContext, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK, POLYGON_NETWORK } from "@constant"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useBalance = () => {
  const { scCaller, account, chainId } = useWalletContext()
  const { session, authenticated, user, bearerToken } = useAuth()
  const [isFetched, setIsFetched] = useState(false)
  const qc = useQueryClient()

  const { data: chainPrice } = useQuery(["chainPrice", account], () => scCaller.current!.getEtherBalance(account!), {
    initialData: 0,
    enabled: !!scCaller.current && !!account,
  })
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
      enabled: !!bearerToken,
      initialData: {
        sipherPrice: {
          eth: 0,
          usd: 0,
          change: 0,
        },
        ethereumPrice: {
          eth: 0,
          usd: 0,
          change: 0,
        },
        maticPrice: {
          eth: 0,
          usd: 0,
          change: 0,
        },
      },
      onSuccess: () => {
        setIsFetched(true)
      },
    },
  )

  const refetch = () => {
    qc.invalidateQueries(["chainPrice", account])
    qc.invalidateQueries(["sipher", account])
    qc.invalidateQueries(["weth", account])
  }

  const totalETHPrice =
    (chainId === ETHEREUM_NETWORK
      ? dataPrice!.ethereumPrice.eth * chainPrice! + dataPrice!.sipherPrice.eth * sipher!
      : chainId === POLYGON_NETWORK
      ? dataPrice!.maticPrice.eth * chainPrice! + dataPrice!.sipherPrice.eth * sipher!
      : 0) ?? 0
  const totalUsdPrice = totalETHPrice * dataPrice!.ethereumPrice.usd ?? 0

  return {
    dataPrice,
    totalETHPrice,
    totalUsdPrice,
    balance: {
      chainPrice: chainPrice ?? 0,
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
