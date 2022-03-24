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
  const { session, authenticated, user } = useAuth()
  const qc = useQueryClient()
  const { collectionId, tokenId } = router.query
  const {
    data: tokenDetails,
    isLoading,
    refetch,
  } = useQuery(
    ["character", collectionId, tokenId, wallet.account],
    () =>
      client.api
        .nftItemControllerGetByCollection(setBearerToken(session?.getIdToken().getJwtToken() as string))
        .then(res => res.data),
    {
      enabled: router.isReady,
      retry: false,
      onSuccess: data => console.log(data),
    },
  )

  const isOwner = wallet.account === tokenDetails?.item.owner

  const revalidate = () => {
    qc.invalidateQueries(["character", collectionId, tokenId, wallet.account])
  }

  const getUserById = (id: string) => tokenDetails?.users?.find(user => user.id === id)

  return {
    tokenDetails,
    isLoading,
    isOwner,
    wallet,
    collectionId: collectionId as string,
    tokenId: tokenId as string,
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
