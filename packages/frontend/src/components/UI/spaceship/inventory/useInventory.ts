import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { POLYGON_NETWORK } from "@constant"
import { Lootbox } from "@sdk"
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
  const [data, setData] = useState<InventoryProps[]>([])

  const { refetch } = useQuery(
    ["lootBoxs", account, user],
    () =>
      client.api
        .lootBoxControllerGetLootboxFromUserId({
          headers: {
            Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
          },
        })
        .then(res => res.data),
    {
      enabled: authenticated && !isFetched,
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

  const handleView = (id: string) => {
    router.push(`/spaceship/${id}`)
  }

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
            {
              headers: {
                Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
              },
            },
          )
          .then(res => res.data)
        await scCaller.current!.SipherSpaceshipPart.mintBatch(data.batchIDs, data.amounts, data.salt, data.signature)
      } else {
        const data = await client.api
          .lootBoxControllerMintLootbox(
            {
              publicAddress: account!,
              batchID: inventoryDataCheck![0].tokenId,
              amount: inventoryDataCheck![0].slot,
            },
            {
              headers: {
                Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
              },
            },
          )
          .then(res => res.data)
        await scCaller.current!.SipherSpaceshipPart.mint(data.batchID, data.amount, data.salt, data.signature)
      }
    },
    {
      onSuccess: () => {
        setIsStatusModal("SUCCESS")
      },
      onSettled: () => {
        refetch()
        query.invalidateQueries(["pending", user])
      },
      onError: err => {
        console.log(err)
      },
    },
  )

  const handleMint = () => {
    if (chainId === POLYGON_NETWORK) {
      mutateMintBatch()
    } else {
      switchNetwork(POLYGON_NETWORK)
    }
  }

  return {
    isLoading,
    isStatusModal,
    handleMint,
    inventoryDataCheck,
    inventoryData,
    setIsStatusModal,
    handleView,
  }
}
