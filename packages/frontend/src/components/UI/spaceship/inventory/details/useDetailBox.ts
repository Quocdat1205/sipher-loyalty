import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useChakraToast } from "@hooks"
import { Lootbox } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export interface DetailsBox extends Lootbox {
  slot: number
  onChange?: (id: string, slot: number) => void
}

export const useDetailBox = id => {
  const { bearerToken } = useAuth()
  const { scCaller } = useWalletContext()
  const query = useQueryClient()
  const { account, chainId, switchNetwork } = useWalletContext()
  const [slot, setSlot] = useState(1)
  const toast = useChakraToast()
  const router = useRouter()

  const { data: details, isFetched } = useQuery(
    ["detailsLootBox", account, id],
    () => client.api.lootBoxControllerGetLootboxById(account!, id, setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken,
      onSuccess: data => {
        setSlot(data.mintable)
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
            setBearerToken(bearerToken),
          )
          .then(res => res.data)
        await scCaller.current!.SipherSpaceshipLootBox.mint(data)
      }
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Minted successfully!",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
      },
      onSettled: () => {
        query.invalidateQueries(["detailsLootBox", account, id])
      },
      onError: (err: any) => {
        if (err.code === 4001) {
          toast({
            status: "error",
            title: "Transaction rejected!",
            message: "Please check the pending tab if you want to mint again",
            duration: 10000,
          })
        } else {
          toast({ status: "error", title: "Error", message: err?.message })
        }
      },
    },
  )

  return {
    router,
    isFetched,
    mutateMint,
    slot,
    setSlot,
    details,
    isLoading,
  }
}
