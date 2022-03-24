import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useChakraToast } from "@hooks"
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
  const { account, chainId, switchNetwork } = useWalletContext()
  const [isFetched, setIsFetched] = useState(false)
  const [slot, setSlot] = useState(1)
  const toast = useChakraToast()
  const { data: details, isFetched: isFetching } = useQuery(
    ["detailsLootBox", account, user],
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
      if (chainId !== POLYGON_NETWORK) {
        toast({ status: "info", title: "Please switch to Polygon network!", duration: 5000 })
        switchNetwork(POLYGON_NETWORK)
      } else {
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
        await scCaller.current!.SipherSpaceshipLootBox.mint({
          deadline: data.deadline,
          batchID: data.batchID,
          amount: data.amount,
          salt: data.salt,
          signature: data.signature,
        })
      }
    },
    {
      onSuccess: () => {
        setIsFetched(false)
        toast({
          status: "success",
          title: "Transaction Successful",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
      },
      onSettled: () => {
        setIsFetched(false)
        query.invalidateQueries(["detailsLootBox", account, user])
      },
      onError: (err: any) => {
        if (err.code === 4001) {
          toast({
            status: "error",
            title: "Transaction rejected",
            message: "Please check pending tab if you want minted again",
            duration: 10000,
          })
        } else {
          toast({ status: "error", title: "Error", message: err?.message })
        }
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
