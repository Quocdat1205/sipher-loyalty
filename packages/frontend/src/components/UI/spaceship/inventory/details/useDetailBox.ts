import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { Lootbox } from "@sdk"
import { useAuth } from "src/providers/auth"

export interface DetailsBox extends Lootbox {
  slot: number
  onChange?: (id: string, slot: number) => void
}

export const useDetailBox = id => {
  const { session, authenticated, user } = useAuth()
  const { scCaller } = useWalletContext()
  const query = useQueryClient()
  const { account } = useWalletContext()
  const [isFetched, setIsFetched] = useState(false)
  const [slot, setSlot] = useState(1)

  const { data: details, isFetched: isFetching } = useQuery(
    ["detailsLootBox", user],
    () =>
      client.api
        .lootBoxControllerGetLootboxById(account!, id, {
          headers: {
            Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
          },
        })
        .then(res => res.data),
    {
      enabled: authenticated && !isFetched,
      onSuccess: data => {
        setSlot(data.mintable)
        setIsFetched(true)
      },
    },
  )

  const { mutate: mutateMint, isLoading } = useMutation(
    async () => {
      const data = await client.api
        .lootBoxControllerMintLootbox(
          {
            publicAddress: account!,
            batchID: details!.tokenId,
            amount: slot,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
            },
          },
        )
        .then(res => res.data)
      await scCaller.current!.SipherSpaceshipPart.mint(data.batchID, data.amount, data.salt, data.signature)
    },
    {
      onSuccess: () => {
        setIsFetched(false)
      },
      onSettled: () => {
        setIsFetched(false)
        query.invalidateQueries(["detailsLootBox", account, user])
      },
      onError: err => {
        console.log(err)
      },
    },
  )

  return {
    isFetching,
    mutateMint,
    slot,
    setSlot,
    details,
    isLoading,
  }
}
