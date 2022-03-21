import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import client from "@client"

import { ClaimLootboxInputDto } from "@sdk"
import { useAuth } from "src/providers/auth"

export const useClaim = () => {
  const { session, authenticated, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
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

  const { mutate: mutateOnClaim } = useMutation<unknown, unknown, { tokenId: string; data: ClaimLootboxInputDto }>(
    input => client.api.lootBoxControllerClaim(input.tokenId, input.data),
    {
      onMutate: () => setIsLoading(true),
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    },
  )

  const claimData =
    boxData?.data.map(item => ({
      ...item,
      expiredDate: new Date(item.expiredDate).getTime() * 1000,
    })) ?? []

  const totalQuantiy = claimData.map(item => item.quantity).reduce((pre, val) => pre + val, 0)

  return { claimData, isLoading, mutateOnClaim, totalQuantiy }
}
