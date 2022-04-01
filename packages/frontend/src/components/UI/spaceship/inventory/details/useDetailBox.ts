import { useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useChakraToast } from "@hooks"
import { Lootbox, MintStatus } from "@sdk"
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
  const [status, setStatus] = useState("")
  const [mintedData, setMintedData] = useState<DetailsBox>()
  const [isFetch, setIsFetch] = useState(false)
  const idError = useRef<number | null>()

  const { data: details, isFetched } = useQuery(
    ["detailsLootBox", account, id],
    () => client.api.lootBoxControllerGetLootboxById(account!, id, setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken && !isFetch,
      onSuccess: data => {
        setIsFetch(true)
        setSlot(data.mintable)
      },
    },
  )

  const { mutate: mutateStatus } = useMutation<unknown, unknown, { id: number; status: MintStatus }>(
    ({ id, status }) =>
      client.api.mintControllerUpdateStatusPendingLootbox(
        {
          publicAddress: account!,
          id: id,
          status: status,
        },
        setBearerToken(bearerToken),
      ),
    {
      onSettled: () => {
        idError.current = null
      },
    },
  )

  const { mutate: mutateMint, isLoading } = useMutation(
    async () => {
      if (chainId !== POLYGON_NETWORK) {
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
        idError.current = data.id
        await scCaller.current!.SipherSpaceshipLootBox.mint(data)
      }
    },
    {
      onMutate: () => {
        setMintedData({ ...details!, slot: slot })
      },
      onSuccess: () => {
        setStatus("SUCCESS")
      },
      onSettled: () => {
        setIsFetch(false)
        query.invalidateQueries(["detailsLootBox", account, id])
      },
      onError: (err: any) => {
        toast({ status: "error", title: "Error", message: err?.message })

        if (err.code === 4001) {
          setStatus("PENDING")
          mutateStatus({ id: idError!.current!, status: "Rejected" as MintStatus })
        } else {
          setStatus("ERROR")
          mutateStatus({ id: idError!.current!, status: "Error" as MintStatus })
        }
      },
    },
  )

  const handleClick = () => {
    setStatus("MINT")
  }

  return {
    router,
    isFetched,
    handleClick,
    mutateMint,
    slot,
    setSlot,
    details,
    isLoading,
    status,
    setStatus,
    mintedData,
  }
}
