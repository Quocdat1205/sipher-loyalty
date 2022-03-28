import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useNFTs = collectionId => {
  const router = useRouter()
  const { user, bearerToken } = useAuth()
  const { account } = useWalletContext()
  const gridSize = useStore(state => state.gridSize)
  const columns = gridSize === "small" ? [2, 3, 4, 5, 5] : [1, 2, 3, 4, 4]

  const { data: initData, isFetched } = useQuery<any>(
    ["nfts", user, account, collectionId],
    () =>
      client.api
        .collectionControllerGetPortfolioByCollection(account!, collectionId, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      initialData: [],
    },
  )
  const nftsData = initData!.items?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${collectionId}/${item.id}`),
  }))

  const collectionData = initData!.collection
  return { collectionData, columns, total: initData!.total, nftsData, isFetched }
}
export default useNFTs
