import { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { Img } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { ETHEREUM_NETWORK, POLYGON_NETWORK } from "@constant"
import { useBalanceContext } from "@hooks"
import { CollectionCategory } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const collectionSort = [
  { value: "sipherianflash", text: "SIPHER NEKO" },
  { value: "sipheriansurge", text: "SIPHER INU" },
  { value: "siphersculpture", text: "SIPHER Sculpture" },
  { value: "sipherspaceship", text: "SIPHER Spaceship" },
]

export const categoriesSort = [
  { value: "character", text: "Character" },
  { value: "sculpture", text: "Sculpture" },
  { value: "lootbox", text: "Lootbox" },
  { value: "spaceship", text: "Spaceship" },
]

const initFilter = {
  categories: "",
  collection: "",
}

const usePortfolio = () => {
  const router = useRouter()
  const { session, authenticated, user } = useAuth()
  const { account, chainId } = useWalletContext()
  const { dataPrice, balance } = useBalanceContext()
  const [filter, setFilter] = useState(initFilter)

  const currentTab = router.query.tab || "nfts"

  const { data: initData } = useQuery<any>(
    ["collection", user, account, filter],
    () =>
      client.api
        .collectionControllerGetUserCollection(
          account!,
          {
            category: (filter.categories !== "" ? filter.categories : undefined) as CollectionCategory,
          },
          setBearerToken(session?.getIdToken().getJwtToken() as string),
        )
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
      initialData: [],
    },
  )

  const tokensData = [
    {
      currency: "ETH",
      balance: chainId === ETHEREUM_NETWORK ? balance.chainPrice : 0,
      value: chainId === ETHEREUM_NETWORK ? balance.chainPrice * dataPrice!.ethereumPrice.usd : 0,
      change: dataPrice!.ethereumPrice.change * 100,
      icon: <EthereumIcon size="1.4rem" />,
    },
    {
      currency: "MATIC",
      balance: chainId === POLYGON_NETWORK ? balance.chainPrice : 0,
      value: chainId === POLYGON_NETWORK ? balance.chainPrice * dataPrice!.maticPrice.usd : 0,
      change: dataPrice!.maticPrice.change * 100,
      icon: <Img src="/images/icons/matic.png" alt="matic" h="1.4rem" />,
    },
    {
      currency: "SIPHER",
      balance: balance.sipher,
      value: balance.sipher * dataPrice!.sipherPrice.usd,
      change: dataPrice!.sipherPrice.change * 100,
      icon: <SipherIcon size="1.4rem" />,
    },
  ]

  const collectionData = initData?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${item.id}`),
  }))

  const totalNFTs = collectionData.reduce((accu, curr) => accu + curr.total, 0)
  const totalToken = tokensData.length
  const totalETHPrice =
    (chainId === ETHEREUM_NETWORK
      ? dataPrice!.ethereumPrice.eth * balance.chainPrice + dataPrice!.sipherPrice.eth * balance.sipher
      : chainId === POLYGON_NETWORK
      ? dataPrice!.maticPrice.eth * balance.chainPrice + dataPrice!.sipherPrice.eth * balance.sipher
      : 0) ?? 0
  const totalUsdPrice = totalETHPrice * dataPrice!.ethereumPrice.usd ?? 0

  return {
    totalUsdPrice,
    totalETHPrice,
    tokensData,
    totalToken,
    totalNFTs,
    collectionData,
    filter,
    setFilter,
    currentTab,
    router,
  }
}
export default usePortfolio
