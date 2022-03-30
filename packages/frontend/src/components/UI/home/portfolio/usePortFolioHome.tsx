import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { ETHEREUM_NETWORK } from "@constant"
import { useBalanceContext } from "@hooks"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const usePortFolioHome = () => {
  const router = useRouter()
  const { bearerToken } = useAuth()
  const { account, chainId } = useWalletContext()
  const { dataPrice, balance, totalUsdPrice } = useBalanceContext()

  const { data: dataInit } = useQuery<any>(
    ["collection", account],
    () =>
      client.api.collectionControllerGetUserCollection(account!, {}, setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      initialData: [],
    },
  )

  const tokensData = account
    ? [
        {
          currency: "ETH",
          balance: chainId === ETHEREUM_NETWORK ? balance.chainPrice : 0,
          value: chainId === ETHEREUM_NETWORK ? balance.chainPrice * dataPrice!.ethereumPrice.usd : 0,
          change: dataPrice!.ethereumPrice.change * 100,
          icon: <EthereumIcon size="1.4rem" />,
        },
        // {
        //   currency: "MATIC",
        //   balance: chainId === POLYGON_NETWORK ? balance.chainPrice : 0,
        //   value: chainId === POLYGON_NETWORK ? balance.chainPrice * dataPrice!.maticPrice.usd : 0,
        //   change: dataPrice!.maticPrice.change * 100,
        //   icon: <Img src="/images/icons/matic.png" alt="matic" h="1.4rem" />,
        // },
        {
          currency: "SIPHER",
          balance: balance.sipher,
          value: balance.sipher * dataPrice!.sipherPrice.usd,
          change: dataPrice!.sipherPrice.change * 100,
          icon: <SipherIcon size="1.4rem" />,
        },
      ]
    : []

  const collectionData = dataInit?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${item.id}`),
  }))

  const totalNFTs = collectionData.reduce((acc, curr) => acc + curr.total, 0)
  const totalToken = tokensData.length

  return { totalNFTs, totalToken, totalUsdPrice, tokensData, collectionData }
}
export default usePortFolioHome
