import { useEffect, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { useChakraToast } from "@hooks"
import { Lootbox, MintStatus } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export interface InventoryProps extends Lootbox {
  isChecked: boolean
  slot: number
  onChange?: (id: string, slot: number) => void
}

export const useInventory = () => {
  const { session, authenticated, user } = useAuth()
  const [isStatusModal, setIsStatusModal] = useState("")
  const query = useQueryClient()
  const { account, scCaller, chainId, switchNetwork } = useWalletContext()
  const router = useRouter()
  const [isFetched, setIsFetched] = useState(false)
  const [dataMinted, setDataMinted] = useState<InventoryProps[]>([])
  const [data, setData] = useState<InventoryProps[]>([])
  const toast = useChakraToast()
  const idError = useRef<string | null>()

  const { refetch } = useQuery(
    ["lootBoxs", account, user],
    () =>
      client.api
        .lootBoxControllerGetLootboxFromUserId(setBearerToken(session?.getIdToken().getJwtToken() as string))
        .then(res => res.data),
    {
      enabled: authenticated && !!account && !isFetched,
      onSuccess: data => {
        setData(data.map(item => ({ ...item, slot: item.mintable, isChecked: false }))), setIsFetched(true)
      },
      initialData: [],
    },
  )

  const inventoryData = data!.map(item => ({
    ...item,
    isDisabled: item.publicAddress !== account,
    onSelect: (isChecked = false) => {
      const oldState = data
      oldState.find(i => i.id === item.id)!.isChecked = isChecked
      setData([...oldState])
    },
    onView: () => router.push(`/spaceship/${item.id}`),
  }))

  const inventoryDataCheck = data!
    .filter(i => i.isChecked)
    .map(item => ({
      ...item,
      onChange: (slot: number) => {
        const oldState = data
        oldState.find(i => i.id === item.id)!.slot = slot
        setData([...oldState])
      },
    }))

  useEffect(() => {
    setData(data?.map(item => ({ ...item, isChecked: false })))
  }, [account])

  const { mutate: mutateStatus } = useMutation<unknown, unknown, { id: string; status: MintStatus }>(
    ({ id, status }) =>
      client.api.mintControllerUpdateStatusPendingLootbox(
        {
          publicAddress: account!,
          id: id,
          status: status,
        },
        setBearerToken(session?.getIdToken().getJwtToken() as string),
      ),
    {
      onSettled: () => {
        idError.current = null
      },
    },
  )

  const { mutate: mutateMintBatch, isLoading } = useMutation(
    async () => {
      if (inventoryDataCheck!.length > 1) {
        const data = await client.api
          .lootBoxControllerMintBatchLootbox(
            {
              publicAddress: account!,
              batchID: inventoryDataCheck!.map(item => item.tokenId)!,
              amount: inventoryDataCheck!.map(item => item.slot)!,
            },
            setBearerToken(session?.getIdToken().getJwtToken() as string),
          )
          .then(res => res.data)
        idError.current = data.id
        await scCaller.current!.SipherSpaceshipLootBox.mintBatch({
          deadline: data.deadline,
          batchIDs: data.batchIDs,
          amounts: data.amounts,
          salt: data.salt,
          signature: data.signature,
        })
      } else {
        const data = await client.api
          .lootBoxControllerMintLootbox(
            {
              publicAddress: account!,
              batchID: inventoryDataCheck![0].tokenId,
              amount: inventoryDataCheck![0].slot,
            },
            setBearerToken(session?.getIdToken().getJwtToken() as string),
          )
          .then(res => res.data)
        idError.current = data.id
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
      onMutate: () => {
        setDataMinted(data.filter(i => i.isChecked))
      },
      onSuccess: () => {
        setIsStatusModal("SUCCESS")
      },
      onSettled: () => {
        refetch()
        query.invalidateQueries(["pending", account, user])
      },
      onError: (err: any) => {
        toast({ status: "error", title: "Error", message: err?.message })
        if (err.code === 4001) {
          mutateStatus({ id: idError!.current!, status: "Rejected" as MintStatus })
          setIsStatusModal("PENDING")
        } else {
          mutateStatus({ id: idError!.current!, status: "Rejected" as MintStatus })
        }
      },
    },
  )
  useEffect(() => {
    setData(data.map(item => ({ ...item, slot: item.mintable })))
  }, [isStatusModal])

  const handleMint = () => {
    if (chainId !== POLYGON_NETWORK) {
      switchNetwork(POLYGON_NETWORK)
    } else {
      mutateMintBatch()
    }
  }

  return {
    dataMinted,
    isLoading,
    isStatusModal,
    handleMint,
    inventoryDataCheck,
    inventoryData,
    setIsStatusModal,
  }
}
