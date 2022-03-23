import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { Lootbox } from "@sdk"
import { useAuth } from "src/providers/auth"

export interface InventoryProps extends Lootbox {
  isChecked: boolean
  slot: number
  onChange?: (id: string, slot: number) => void
}

export interface InputLootBoxProp {
  batchID?: number
  amount?: number
  batchIDs?: number[]
  amounts?: number[]
  salt: string
  signature: string
}

export const usePending = () => {
  const { session, authenticated, user } = useAuth()
  const query = useQueryClient()
  const { account, scCaller } = useWalletContext()

  const { data: dataInit } = useQuery(
    ["pending", user],
    () =>
      client.api.mintControllerGetPendingLootbox(account!, {
        headers: {
          Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
        },
      }),

    { enabled: authenticated && !!account },
  )

  const { mutate: mutateMintBatch } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ batchIDs, amounts, salt, signature }) =>
      scCaller.current!.SipherSpaceshipPart.mintBatch(batchIDs!, amounts!, salt, signature),
    {
      onSuccess: () => {
        query.invalidateQueries(["pending", user])
      },
    },
  )

  const { mutate: mutateMint } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ batchID, amount, salt, signature }) =>
      scCaller.current!.SipherSpaceshipPart.mint(batchID!, amount!, salt, signature),
    {
      onSuccess: () => {
        query.invalidateQueries(["pending", user])
      },
    },
  )

  const pendingData = dataInit?.data.map(item => ({
    ...item,
    onMint: () => {
      mutateMint({ batchID: item.batchID, amount: item.amount, salt: item.salt, signature: item.signature })
    },
    onMintBatch: () => {
      mutateMintBatch({ batchIDs: item.batchIDs, amounts: item.amounts, salt: item.salt, signature: item.signature })
    },
  }))

  return {
    pendingData,
  }
}
