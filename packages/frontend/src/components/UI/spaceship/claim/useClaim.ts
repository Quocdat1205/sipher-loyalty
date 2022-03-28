import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const useClaim = () => {
  const { bearerToken } = useAuth()
  const [isStatusModal, setIsStatusModal] = useState("")
  const query = useQueryClient()
  const { account } = useWalletContext()

  const { data } = useQuery(
    "claimableLootBox",
    () => client.api.lootBoxControllerGetClaimableLootboxFromUserId(setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken,
      initialData: [],
    },
  )
  const { mutate: mutateOnClaim, isLoading } = useMutation(
    () => client.api.lootBoxControllerClaim(account!, setBearerToken(bearerToken)),
    {
      onSuccess: () => {
        setIsStatusModal("SUCCESS")
        query.invalidateQueries("claimableLootBox")
      },
      onError: () => {
        setIsStatusModal("FAILED")
      },
    },
  )

  const claimData = data!.map(item => ({
    ...item,
    expiredDate: new Date(item.expiredDate).getTime(),
  }))

  const totalQuantity = claimData.reduce((accu, curr) => accu + curr.quantity, 0)

  const isCheckAccountClaim = claimData.every(item => item.publicAddress === account)

  return {
    account,
    claimData,
    isLoading,
    mutateOnClaim,
    totalQuantity,
    isCheckAccountClaim,
    isStatusModal,
    setIsStatusModal,
  }
}
