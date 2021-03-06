import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import useWeb3Wallet from "@web3-wallet"

import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const useClaim = () => {
  const { bearerToken } = useAuth()
  const [isStatusModal, setIsStatusModal] = useState("")
  const query = useQueryClient()
  const { account } = useWeb3Wallet()

  const { data, isFetched } = useQuery(
    ["claimableLootBox", account],
    () =>
      client.api
        .lootBoxControllerGetClaimableLootboxFromWallet(account!, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      initialData: [],
    },
  )
  const { mutate: mutateOnClaim, isLoading } = useMutation(
    () => client.api.lootBoxControllerClaim(account!, setBearerToken(bearerToken)),
    {
      onSuccess: () => {
        setIsStatusModal("SUCCESS")
      },
      onSettled: () => {
        query.invalidateQueries(["claimableLootBox", account])
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

  const isCheckAccountClaim = claimData.every(
    item => item.publicAddress.toLocaleUpperCase() === account?.toLocaleUpperCase(),
  )

  return {
    isFetched,
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
