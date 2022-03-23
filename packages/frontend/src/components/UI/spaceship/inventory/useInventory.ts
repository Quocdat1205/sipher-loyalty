import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

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
  const { account, scCaller } = useWalletContext()
  const router = useRouter()
  const [isFetched, setIsFetched] = useState(false)
  const [data, setData] = useState<InventoryProps[]>()

  const {} = useQuery(
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
    },
  )

  const inventoryData = data?.map(item => ({
    ...item,
    onSelect: (id: string, isChecked?: boolean) => {
      setData(
        data.map(item => {
          if (item.id === id) {
            return { ...item, isChecked: isChecked !== undefined ? isChecked : !item.isChecked }
          }
          return item
        }),
      )
    },
  }))

  const inventoryDataCheck = data
    ?.filter(i => i.isChecked)
    .map(item => ({
      ...item,
      onChange: (id: string, slot: number) => {
        setData(
          data.map(item => {
            if (item.id === id) {
              return { ...item, slot: slot }
            }
            return item
          }),
        )
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
        setIsFetched(false)
        setIsStatusModal("SUCCESS")
      },
      onSettled: () => {
        setIsFetched(false)
        query.invalidateQueries(["lootBoxs", account, user])
        query.invalidateQueries(["pending", user])
      },
      onError: err => {
        console.log(err)
      },
    },
  )

  const isCheckAccountClaim = inventoryData?.find(item => item.publicAddress)?.publicAddress === account

  const handleMint = () => {
    mutateMintBatch()
  }

  return {
    isLoading,
    isStatusModal,
    handleMint,
    inventoryDataCheck,
    inventoryData,
    isCheckAccountClaim,
    setIsStatusModal,
    handleView,
  }
}
