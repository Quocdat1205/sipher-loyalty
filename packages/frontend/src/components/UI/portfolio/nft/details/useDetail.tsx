import { createContext, ReactNode, useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useDetail = () => {
  const wallet = useWalletContext()
  const router = useRouter()
  const { bearerToken } = useAuth()
  const qc = useQueryClient()
  const { collectionId, id } = router.query

  const {
    data: tokenDetails,
    isLoading,
    isFetched,
    refetch,
  } = useQuery<any>(
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

  const isOwner = wallet.account === tokenDetails?.owner

  const revalidate = () => {
    qc.invalidateQueries(["detailNFT", wallet.account, id])
  }

  const getUserById = (id: string) => tokenDetails?.users?.find(user => user.id === id)

  return {
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
    getUserById,
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
