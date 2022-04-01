import { createContext, ReactNode, useContext, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK, NftContracts } from "@constant"
import { useChakraToast } from "@hooks"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useDetail = () => {
  const wallet = useWalletContext()
  const router = useRouter()
  const { bearerToken } = useAuth()
  const qc = useQueryClient()
  const { collectionId, id } = router.query
  const toast = useChakraToast()
  const [addressTo, setAddressTo] = useState("")

  const {
    data: tokenDetails,
    isLoading,
    isFetched,
    refetch,
  } = useQuery(
    ["detailNFT", wallet.account, id],
    () =>
      client.api
        .collectionControllerGetItemById(wallet.account!, id as string, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: router.isReady && !!bearerToken,
      retry: false,
    },
  )

  const collectionName = NftContracts.find(contract => contract.address === tokenDetails?.collection.id)?.name ?? ""

  const isOwner = wallet.account === tokenDetails?.owner

  const revalidate = () => {
    qc.invalidateQueries(["detailNFT", wallet.account, id])
  }

  const { mutate: mutateTransfer, isLoading: isLoadingTranfer } = useMutation(
    async () => {
      if (wallet.chainId !== ETHEREUM_NETWORK) {
        wallet.switchNetwork(ETHEREUM_NETWORK)
      } else {
        wallet.scCaller.current!.DynamicERC721.transfer(tokenDetails!.collectionId, addressTo, tokenDetails!.tokenId)
      }
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        revalidate()
      },
    },
  )

  // const { mutate: mutameBurn, isLoading: isLoadingBurn } = useMutation(
  //   async () => {
  //     if (wallet.chainId !== ETHEREUM_NETWORK) {
  //       wallet.switchNetwork(ETHEREUM_NETWORK)
  //     } else {
  //       wallet.scCaller.current!.SipherSpaceshipLootBox.burn(tokenDetails!., tokenDetails!.tokenId)
  //     }
  //   },
  //   {
  //     onSuccess: () => {
  //       toast({
  //         status: "success",
  //         title: "Transaction pending",
  //         message: "Please review your wallet notifications.",
  //         duration: 10000,
  //       })
  //       revalidate()
  //     },
  //   },
  // )

  const handleLinkOpenSea = () => {
    window.open(`https://opensea.io/assets/${tokenDetails?.collectionId}/${tokenDetails?.tokenId}`, "_blank")
  }

  return {
    handleLinkOpenSea,
    isLoadingTranfer,
    addressTo,
    setAddressTo,
    mutateTransfer,
    collectionName,
    router,
    isFetched,
    tokenDetails,
    isLoading,
    isOwner,
    wallet,
    collectionId: collectionId as string,
    tokenId: id as string,
    refetch,
    revalidate,
  }
}

const DetailContext = createContext<ReturnType<typeof useDetail> | null>(null)

export const DetailProvider = ({ children }: { children: ReactNode }) => {
  const detail = useDetail()
  return <DetailContext.Provider value={detail}>{children}</DetailContext.Provider>
}

export const useDetailContext = () => {
  const context = useContext(DetailContext)
  if (context === null) {
    throw new Error("useDetailContext must be used within a DetailProvider")
  }
  return context
}
