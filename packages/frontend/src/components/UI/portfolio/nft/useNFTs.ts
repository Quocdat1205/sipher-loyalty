import { useState } from "react"
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useBalanceContext, useChakraToast } from "@hooks"
import { NftItem, PortfolioByCollectionResponse } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export interface NFTItemProp extends NftItem {
  isChecked: boolean
  slot: number
  minable: number
}

const useNFTs = collectionId => {
  const router = useRouter()
  const take = 30
  const { bearerToken } = useAuth()
  const { account, scCaller, switchNetwork, chainId } = useWalletContext()
  const {
    balance: { chainPrice },
  } = useBalanceContext()
  const gridSize = useStore(state => state.gridSize)
  const columns = gridSize === "small" ? [2, 3, 5, 5, 6] : [1, 2, 4, 4, 4]
  const [data, setData] = useState<NFTItemProp[]>()
  const [modal, setModal] = useState("")
  const [dataMinted, setDataMinted] = useState<NFTItemProp[]>([])

  const qc = useQueryClient()
  const toast = useChakraToast()

  const getNFTWithRange = async ({ pageParam = 0 }) => {
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
    onSuccess: data =>
      setData(
        data.pages
          ?.reduce((acc: NftItem[], cur) => [...acc, ...cur.items], [])
          .map(item => ({
            ...item,
            minable: item?.value ?? 0,
            slot: item?.value > 0 ? 1 : 0,
            isChecked: false,
          })),
      ),
    refetchOnWindowFocus: false,
  })

  const revalidate = () => {
    qc.invalidateQueries(["nfts", account, collectionId])
  }

  const nftCount: number = !query.data ? 0 : query.data?.pages[0]?.total

  const collectionData = !query.data ? undefined : query.data?.pages[0]?.collection

  const nftsData =
    data?.map(item => ({
      ...item,
      onView: () => router.push(`/portfolio/${collectionId}/${item.id}`),
      onSelect: (isChecked = false) => {
        if (item.type === "ERC1155" && collectionData?.category === "lootbox") {
          const oldState = data
          oldState.find(i => i.id === item.id)!.isChecked = isChecked
          setData([...oldState])
        } else {
          router.push(`/portfolio/${collectionId}/${item.id}`)
        }
      },
    })) ?? []

  const nftsDataCheck = nftsData
    ?.filter(i => i.isChecked)
    .map(item => ({
      ...item,
      onChange: (slot: number) => {
        if (data) {
          const oldState = data
          oldState.find(i => i.id === item.id)!.slot = slot
          setData([...oldState])
        }
      },
    }))

  const { mutate: mutateBurnBatch, isLoading: isLoadingBurn } = useMutation(
    async () => {
      if (nftsDataCheck.length > 1) {
        await scCaller.current!.SipherSpaceshipLootBox.burnBatch({
          batchIDs: nftsDataCheck.map(i => parseInt(i.tokenId)),
          amounts: nftsDataCheck.map(i => i.slot),
        })
      } else {
        await scCaller.current!.SipherSpaceshipLootBox.burn({
          batchID: parseInt(nftsDataCheck[0].tokenId),
          amount: nftsDataCheck[0].slot,
        })
      }
    },
    {
      onMutate: () => {
        setDataMinted(data!.filter(i => i.isChecked))
      },
      onSuccess: () => {
        setModal("SUCCESS")
        setData(data?.map(item => ({ ...item, minable: item.minable - item.slot })))
      },
      onSettled: () => {
        revalidate()
      },
      onError: (err: any) => {
        toast({ status: "error", title: "Error", message: err?.message })
        setModal("ERROR")
      },
    },
  )

  const handleClick = () => {
    setModal("CONFIRM")
  }

  const handleBurn = () => {
    if (chainId !== POLYGON_NETWORK) {
      switchNetwork(POLYGON_NETWORK)
    } else {
      if (chainPrice > 0.1) {
        mutateBurnBatch()
      } else {
        toast({
          status: "error",
          title: "Error",
          message: "You have insufficient funds to create the transaction",
          duration: 5000,
        })
      }
    }
  }

  return {
    gridSize,
    handleBurn,
    isLoadingBurn,
    dataMinted,
    modal,
    setModal,
    handleClick,
    nftsDataCheck,
    router,
    collectionData: collectionData,
    columns,
    total: nftCount,
    nftsData,
    isFetched: query.isFetched,
    query,
  }
}
export default useNFTs
