import { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { ETHEREUM_NETWORK } from "@constant"
import { useBalanceContext } from "@hooks"
import { CollectionCategory } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const categoriesSort = [
  { value: "character", text: "Character" },
  { value: "sculpture", text: "Sculpture" },
  { value: "lootbox", text: "Lootbox" },
  { value: "spaceship", text: "Spaceship" },
]

const usePortfolio = () => {
  const router = useRouter()
  const { bearerToken } = useAuth()
  const { account, chainId } = useWalletContext()
  const { dataPrice, balance, totalETHPrice, totalUsdPrice } = useBalanceContext()
  const [filter, setFilter] = useState("")
  const [isLoadingCollection, setIsLoadingCollection] = useState(true)

  const currentTab = router.query.tab || "nfts"

  const { data: initData, isFetched } = useQuery(
    ["collection", bearerToken, account, filter],
    () =>
      client.api
        .collectionControllerGetUserCollection(
          account!,
          {
            category: (filter !== "" ? filter : undefined) as CollectionCategory,
          },
          setBearerToken(bearerToken),
        )
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      initialData: [],
      onSuccess: () => {
        setIsLoadingCollection(false)
      },
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

  const collectionData =
    initData?.map(item => ({
      ...item,
      onView: () => router.push(`/portfolio/${item.id}`),
    })) ?? []

  const totalNFTs = collectionData?.reduce((accu, curr) => accu + curr.total, 0)
  const totalToken = tokensData.length
  const arrayCollectionPrice = collectionData?.map(item => item.total * parseFloat(item.floorPrice ?? "0")) ?? []
  const totalCollectionPrice = arrayCollectionPrice.reduce((acc, curr) => acc + curr, 0)

  return {
    totalUsdPrice,
    totalCollectionPrice,
    totalETHPrice,
    tokensData,
    totalToken,
    totalNFTs,
    collectionData,
    filter,
    setFilter,
    isLoadingCollection,
    currentTab,
    router,
    isFetched,
  }
}
export default usePortfolio
