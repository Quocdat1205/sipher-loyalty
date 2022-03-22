import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { useAuth } from "src/providers/auth"

export const useClaim = () => {
  const { session, authenticated, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isStatusModal, setIsStatusModal] = useState("")
  const { account } = useWalletContext()
  const { data: boxData } = useQuery(
    ["lootBox", user],
    () =>
      client.api.lootBoxControllerGetClaimableLootboxFromUserId({
        headers: {
          Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
        },
      }),
    {
      enabled: authenticated,
    },
  )

  const { mutate: mutateOnClaim } = useMutation(() => client.api.lootBoxControllerClaim(account!), {
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setIsLoading(false)
      setIsStatusModal("SUCCESS")
    },
    onError: () => {
      setIsLoading(false), setIsStatusModal("FAILED")
    },
  })

  const claimData =
    boxData?.data.map(item => ({
      ...item,
      expiredDate: new Date(item.expiredDate).getTime(),
    })) ?? []

  const totalQuantiy = claimData.map(item => item.quantity).reduce((pre, val) => pre + val, 0)

  const isCheckAccountClaim = claimData.find(item => item.publicAddress)?.publicAddress === account

  return {
    account,
    claimData,
    isLoading,
    mutateOnClaim,
    totalQuantiy,
    isCheckAccountClaim,
    isStatusModal,
    setIsStatusModal,
  }
}
