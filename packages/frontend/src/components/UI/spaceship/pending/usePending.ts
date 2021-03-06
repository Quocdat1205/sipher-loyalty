import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import useWeb3Wallet from "@web3-wallet"

import { POLYGON_NETWORK } from "@constant"
import { useBalanceContext, useChakraToast } from "@hooks"
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
  const { account, contractCaller, switchNetwork, chain } = useWeb3Wallet()
  const [mintId, setMintId] = useState<number | null>(null)
  const [cancelId, setCancelId] = useState<number | null>(null)
  const {
    balance: { chainPrice },
  } = useBalanceContext()

  const toast = useChakraToast()
  const { data: dataInit } = useQuery(
    ["pending", account],
    () => client.api.mintControllerGetPendingLootbox(account!, setBearerToken(bearerToken)).then(res => res.data),
    { enabled: !!bearerToken && !!account, initialData: [] },
  )

  const { mutate: mutateMintBatch, isLoading: isLoadingMintBacth } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ deadline, batchIDs, amounts, salt, signature }) =>
      contractCaller.current!.SipherSpaceshipLootBox.mintBatch({
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
          title: "Minted successfully!",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        query.invalidateQueries(["pending", account])
      },
      onError: (err: any) => {
        toast({ status: "error", title: "Error", message: err?.message })
      },
    },
  )

  const { mutate: mutateMint, isLoading: isLoadingMint } = useMutation<unknown, unknown, InputLootBoxProp>(
    ({ deadline, batchID, amount, salt, signature }) =>
      contractCaller.current!.SipherSpaceshipLootBox.mint({
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
          title: "Minted successfully!",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        query.invalidateQueries(["pending", account])
      },
      onError: (err: any) => {
        toast({ status: "error", title: "Error", message: err?.message })
      },
    },
  )

  const { mutate: mutateCancel } = useMutation<unknown, unknown, { id: number; signature: string }>(
    ({ signature }) => contractCaller.current!.SipherSpaceshipLootBox.cancelOrder(signature),
    {
      onMutate: ({ id }) => {
        setCancelId(id)
      },
      onSettled: () => setCancelId(null),
      onSuccess: () => {
        toast({
          status: "success",
          title: "Cancel order successfully!",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        query.invalidateQueries("lootBoxs")
        query.invalidateQueries(["pending", account])
      },
      onError: (err: any) => {
        toast({ status: "error", title: "Error", message: err?.message })
      },
    },
  )

  const pendingData = dataInit!.map(item => ({
    ...item,
    isMinting: mintId === item.id,
    isCancel: cancelId === item.id,
    isDisabled: isLoadingMintBacth || isLoadingMint,
    onCancel: () => {
      if (chain?.id === POLYGON_NETWORK) {
        mutateCancel({ id: item.id, signature: item.signature })
      } else {
        switchNetwork(POLYGON_NETWORK)
      }
    },
    onMint: () => {
      if (chain?.id !== POLYGON_NETWORK) {
        switchNetwork(POLYGON_NETWORK)
      } else {
        if (chainPrice > 0.1) {
          mutateMint({
            id: item.id,
            deadline: item.deadline,
            batchID: item.batchID,
            amount: item.amount,
            salt: item.salt,
            signature: item.signature,
          })
        } else {
          toast({
            status: "error",
            title: "Error",
            message: "You have insufficient funds to create the transaction",
            duration: 5000,
          })
        }
      }
    },
    onMintBatch: () => {
      if (chain?.id !== POLYGON_NETWORK) {
        switchNetwork(POLYGON_NETWORK)
      } else {
        if (chainPrice > 0.1) {
          mutateMintBatch({
            id: item.id,
            deadline: item.deadline,
            batchIDs: item.batchIDs,
            amounts: item.amounts,
            salt: item.salt,
            signature: item.signature,
          })
        } else {
          toast({
            status: "error",
            title: "Error",
            message: "You have insufficient funds to create the transaction",
            duration: 5000,
          })
        }
      }
    },
  }))

  return {
    pendingData,
  }
}
