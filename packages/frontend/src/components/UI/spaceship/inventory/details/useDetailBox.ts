import { useEffect, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useBalanceContext, useChakraToast } from "@hooks"
import { Lootbox, MintStatus } from "@sdk"
import { setBearerToken, shortenAddress } from "@utils"
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
  const {
    balance: { chainPrice },
  } = useBalanceContext()
  const [slot, setSlot] = useState(1)
  const toast = useChakraToast()
  const router = useRouter()
  const [status, setStatus] = useState("")
  const [mintedData, setMintedData] = useState<DetailsBox>()
  const [isFetch, setIsFetch] = useState(false)
  const idError = useRef<number | null>()
  const [oldAccount, setOldAccount] = useState<string | null>(null)

  const { data: details, isFetched } = useQuery(
    ["detailsLootBox", account, id],
    () => client.api.lootBoxControllerGetLootboxById(account!, id, setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken && !isFetch,
      onSuccess: data => {
        setIsFetch(true)
        setSlot(data?.mintable > 0 ? 1 : 0)
      },
      onError: () => {
        router.push("/spaceship")
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
      } else if (chainPrice > 0.1) {
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
      } else {
        toast({
          status: "error",
          title: "Error",
          message: "You have insufficient funds to create the transaction",
          duration: 5000,
        })
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
    if (details?.publicAddress.toUpperCase() !== account?.toUpperCase()) {
      toast({
        status: "warning",
        title: `Owned by ${shortenAddress(details?.publicAddress ?? "")}`,
        message: `Please switch to ${shortenAddress(details?.publicAddress ?? "")} to mint`,
      })
      return
    }
    setStatus("MINT")
  }

  //check account changed
  useEffect(() => {
    if (account) {
      setOldAccount(account)
    }
  }, [])

  useEffect(() => {
    if (oldAccount !== null && oldAccount !== account) {
      router.push("/spaceship")
    }
  }, [oldAccount])

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
