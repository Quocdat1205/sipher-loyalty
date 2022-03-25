import { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { Img } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { ETHEREUM_NETWORK, POLYGON_NETWORK } from "@constant"
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
  const { account, chainId, scCaller } = useWalletContext()
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

  const { data: currentPrice } = useQuery(
    ["currentPrice", user, account],
    () => scCaller.current!.getEtherBalance(account!),
    {
      enabled: !!scCaller.current && authenticated && !!account,
      initialData: 0,
    },
  )

  const { data: sipherPrice } = useQuery(
    ["sipherPrice", user, account],
    () => scCaller.current!.getSipherBalance(account!),
    {
      enabled: !!scCaller.current && authenticated && !!account,
      initialData: 0,
    },
  )

  const { data: dataPrice } = useQuery(
    ["dataPrice", user, account],
    () =>
      client.api
        .priceControllerGetPrice(setBearerToken(session?.getIdToken().getJwtToken() as string))
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
      initialData: { etherPrice: 0, sipherPrice: 0, priceChange: 0 },
    },
  )

  const dataTokens = [
    {
      currency: "ETH",
      balance: chainId === ETHEREUM_NETWORK ? currentPrice ?? 0 : 0,
      value: currentPrice! * dataPrice!.etherPrice ?? 0,
      change: 900.23,
      icon: <EthereumIcon size="1.4rem" />,
    },
    {
      currency: "MATIC",
      balance: chainId === POLYGON_NETWORK ? currentPrice ?? 0 : 0,
      value: currentPrice! * dataPrice!.etherPrice ?? 0,
      change: 900.23,
      icon: <Img src="/images/icons/matic.png" alt="matic" h="1.4rem" />,
    },
    {
      currency: "SIPHER",
      balance: sipherPrice ?? 0,
      value: sipherPrice! * dataPrice!.sipherPrice ?? 0,
      change: 100.23,
      icon: <SipherIcon size="1.4rem" />,
    },
  ]

  const collectionData = initData?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${item.id}`),
  }))

  const totalNFTs = collectionData.reduce((accu, curr) => accu + curr.total, 0)
  const totalToken = dataTokens.length
  return { dataTokens, totalToken, totalNFTs, collectionData, filter, setFilter, currentTab, router }
}
export default usePortfolio
