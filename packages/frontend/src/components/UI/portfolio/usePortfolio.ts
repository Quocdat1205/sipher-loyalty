import { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

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
  { value: "scuplture", text: "Scuplture" },
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
  const { account } = useWalletContext()
  const [filter, setFilter] = useState(initFilter)

  const currentTab = router.query.tab || "nfts"

  const { data: initData } = useQuery(
    ["collection", user, account, filter],
    () =>
      client.api
        .collectionControllerGetUserCollection(
          account!,
          {
            category: (filter.categories !== "" ? filter.categories : undefined) as
              | "character"
              | "lootbox"
              | "spaceship"
              | "sculpture"
              | undefined,
          },
          setBearerToken(session?.getIdToken().getJwtToken() as string),
        )
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
      initialData: [],
    },
  )

  const collectionData = initData?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${item.collectionSlug}`),
  }))

  const totalNFTs = collectionData.reduce((accu, curr) => accu + curr.total, 0)

  return { totalNFTs, collectionData, filter, setFilter, currentTab, router }
}
export default usePortfolio
