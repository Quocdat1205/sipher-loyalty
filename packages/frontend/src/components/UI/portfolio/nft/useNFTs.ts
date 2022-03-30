import { useInfiniteQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { NftItem, PortfolioByCollectionResponse } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useNFTs = collectionId => {
  const router = useRouter()
  const take = 2
  const { bearerToken } = useAuth()
  const { account } = useWalletContext()
  const gridSize = useStore(state => state.gridSize)
  const columns = gridSize === "small" ? 2 : 2

  const getNFTWithRange = async ({ pageParam = 0 }) => {
    console.log(pageParam)
    const { data } = await client.api.collectionControllerGetPortfolioByCollection(
      account!,
      collectionId,
      { size: take, from: pageParam },
      setBearerToken(bearerToken),
    )

    return data
  }

  const query = useInfiniteQuery<PortfolioByCollectionResponse>(["nfts", account, collectionId], getNFTWithRange, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.items.length < take ? undefined : pages.length
    },
    keepPreviousData: true,
    enabled: !!account && !!bearerToken,
  })

  const nftsData = query.data
    ? query.data.pages
        .reduce((acc: NftItem[], cur) => [...acc, ...cur.items], [])
        .map(item => ({
          ...item,
          onView: () => router.push(`/portfolio/${collectionId}/${item.id}`),
        }))
    : []

  const nftCount: number = !query.data ? 0 : query.data?.pages[0]?.total

  const collectionData = !query.data ? undefined : query.data?.pages[0]?.collection

  return {
    collectionData: collectionData,
    columns,
    total: nftCount,
    nftsData,
    isFetched: query.isFetched,
    query,
  }
}
export default useNFTs
