import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useChakraToast } from "@hooks"
import { Lootbox } from "@sdk"
import { useAuth } from "src/providers/auth"

export interface InventoryProps extends Lootbox {
  isChecked: boolean
  slot: number
  onChange?: (id: string, slot: number) => void
}

export interface InputLootBoxProp {
  id: string
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
  const { account, scCaller, switchNetwork, chainId } = useWalletContext()
  const [mintId, setMintId] = useState<string | null>(null)
  const toast = useChakraToast()
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
      onMutate: ({ id }) => {
        setMintId(id)
      },
      onSettled: () => setMintId(null),
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        query.invalidateQueries(["pending", user])
      },
    },
  )

  const { mutate: mutateMint } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ batchID, amount, salt, signature }) =>
      scCaller.current!.SipherSpaceshipPart.mint(batchID!, amount!, salt, signature),
    {
      onMutate: ({ id }) => {
        setMintId(id)
      },
      onSettled: () => setMintId(null),
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        query.invalidateQueries(["pending", user])
      },
    },
  )

  const pendingData = dataInit?.data.map(item => ({
    ...item,
    isMinting: mintId === item.id,
    onMint: () => {
      if (chainId === POLYGON_NETWORK) {
        mutateMint({
          id: item.id,
          batchID: item.batchID,
          amount: item.amount,
          salt: item.salt,
          signature: item.signature,
        })
      } else {
        switchNetwork(POLYGON_NETWORK)
      }
    },
    onMintBatch: () => {
      if (chainId === POLYGON_NETWORK) {
        mutateMintBatch({
          id: item.id,
          batchIDs: item.batchIDs,
          amounts: item.amounts,
          salt: item.salt,
          signature: item.signature,
        })
      } else {
        switchNetwork(POLYGON_NETWORK)
      }
    },
  }))

  return {
    pendingData,
  }
}
