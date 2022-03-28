import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useChakraToast } from "@hooks"
import { Lootbox } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export interface InventoryProps extends Lootbox {
  isChecked: boolean
  slot: number
  onChange?: (id: string, slot: number) => void
}

export interface InputLootBoxProp {
  id: number
  deadline: number
  batchID?: number
  amount?: number
  batchIDs?: number[]
  amounts?: number[]
  salt: string
  signature: string
}

export const usePending = () => {
  const { bearerToken } = useAuth()
  const query = useQueryClient()
  const { account, scCaller, switchNetwork, chainId } = useWalletContext()
  const [mintId, setMintId] = useState<number | null>(null)
  const [cancelId, setCancelId] = useState<number | null>(null)

  const toast = useChakraToast()
  const { data: dataInit } = useQuery(
    ["pending", account],
    () => client.api.mintControllerGetPendingLootbox(account!, setBearerToken(bearerToken)).then(res => res.data),
    { enabled: !!bearerToken && !!account, initialData: [] },
  )

  const { mutate: mutateMintBatch, isLoading: isLoadingMintBacth } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ deadline, batchIDs, amounts, salt, signature }) =>
      scCaller.current!.SipherSpaceshipLootBox.mintBatch({
        deadline: deadline,
        batchIDs: batchIDs!,
        amounts: amounts!,
        salt: salt,
        signature: signature,
      }),
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
        query.invalidateQueries(["pending", account])
      },
    },
  )

  const { mutate: mutateMint, isLoading: isLoadingMint } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ deadline, batchID, amount, salt, signature }) =>
      scCaller.current!.SipherSpaceshipLootBox.mint({
        deadline: deadline,
        batchID: batchID!,
        amount: amount!,
        salt: salt,
        signature: signature,
      }),
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
        query.invalidateQueries(["pending", account])
      },
    },
  )

  const { mutate: mutateCancel } = useMutation<unknown, unknown, { id: number; signature: string }>(
    ({ signature }) => scCaller.current!.SipherSpaceshipLootBox.cancelOrder(signature),
    {
      onMutate: ({ id }) => {
        setCancelId(id)
      },
      onSettled: () => setCancelId(null),
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        query.invalidateQueries("lootBoxs")
        query.invalidateQueries(["pending", account])
      },
    },
  )

  const pendingData = dataInit!.map(item => ({
    ...item,
    isMinting: mintId === item.id,
    isCancel: cancelId === item.id,
    isDisabled: isLoadingMintBacth || isLoadingMint,
    onCancel: () => {
      if (chainId === POLYGON_NETWORK) {
        mutateCancel({ id: item.id, signature: item.signature })
      } else {
        switchNetwork(POLYGON_NETWORK)
      }
    },
    onMint: () => {
      if (chainId === POLYGON_NETWORK) {
        mutateMint({
          id: item.id,
          deadline: item.deadline,
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
          deadline: item.deadline,
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
