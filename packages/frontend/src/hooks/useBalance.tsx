import { createContext, useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useWalletContext } from "@web3"

const useBalance = () => {
  const { scCaller, account } = useWalletContext()
  const qc = useQueryClient()

  const { data: ethereum } = useQuery(["ethereum", account], () => scCaller.current!.getEtherBalance(account!), {
    initialData: 0,
    enabled: !!scCaller.current && !!account,
  })
  const { data: sipher } = useQuery(["sipher", account], () => scCaller.current!.getSipherBalance(account!), {
    initialData: 0,
    enabled: !!scCaller.current && !!account,
  })
  const { data: weth } = useQuery(["weth", account], () => scCaller.current!.getWETHBalance(account!), {
    initialData: 0,
    enabled: !!scCaller.current && !!account,
  })

  const refetch = () => {
    qc.invalidateQueries(["ethereum", account])
    qc.invalidateQueries(["sipher", account])
    qc.invalidateQueries(["weth", account])
  }

  return {
    balance: {
      ethereum: ethereum ?? 0,
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
