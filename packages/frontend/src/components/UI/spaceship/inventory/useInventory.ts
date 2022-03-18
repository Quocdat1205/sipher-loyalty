import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const initData = [
  {
    id: 1,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
    slot: 5,
  },
  {
    id: 2,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
    slot: 5,
  },
  {
    id: 3,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
    slot: 5,
  },
  {
    id: 4,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
    slot: 5,
  },
  {
    id: 5,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
    slot: 5,
  },
]

export const useInventory = () => {
  const [data, setData] = useState(initData)
  const [isModal, setIsModal] = useState("")
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  const inventoryData = data.map(item => ({
    ...item,
    onSelect: (id: number, isChecked?: boolean) => {
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
    .filter(i => i.isChecked)
    .map(item => ({
      ...item,
      onChange: (id: number, slot: number) => {
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

  const handleView = (id: string | number) => {
    router.push(`/spaceship/inventory/${id}`)
  }

  const openModalMint = () => {
    setIsModal("MINT")
  }

  const closeModal = () => {
    setIsModal("")
  }

  const handleMint = () => {
    setIsSuccess(true)
  }

  useEffect(() => {
    setIsSuccess(false)
  }, [isModal])

  return {
    isSuccess,
    handleMint,
    inventoryDataCheck,
    inventoryData,
    isModal,
    setIsModal,
    openModalMint,
    closeModal,
    handleView,
  }
}
