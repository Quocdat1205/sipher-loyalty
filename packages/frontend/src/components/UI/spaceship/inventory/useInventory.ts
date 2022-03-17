import { useState } from "react"
import { useRouter } from "next/router"

const initData = [
  {
    id: 1,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
  },
  {
    id: 2,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
  },
  {
    id: 3,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
  },
  {
    id: 4,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
  },
  {
    id: 5,
    name: "Sipher Inu #2173",
    imageUrl: "/images/spaceship/box.png",
    isChecked: false,
  },
]

export const useInventory = () => {
  const [data, setData] = useState(initData)
  const [isModal, setIsModal] = useState("")
  const router = useRouter()

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

  const handleView = (id: string | number) => {
    router.push(`/spaceship/inventory/${id}`)
  }

  const openModalShipping = () => {
    setIsModal("SHIPPING")
  }

  const closeModal = () => {
    setIsModal("")
  }

  return { inventoryData, isModal, openModalShipping, closeModal, handleView }
}
