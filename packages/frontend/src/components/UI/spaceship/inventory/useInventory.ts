import { useState } from "react"

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
]

export const useInventory = () => {
  const [data, setData] = useState(initData)
  const [isModal, setIsModal] = useState("")

  const inventoryData = data.map(item => ({
    ...item,
    onSelect: id => {
      setData(
        data.map(item => {
          if (item.id === id) {
            return { ...item, isChecked: !item.isChecked }
          }
          return item
        }),
      )
    },
  }))

  const openModalShipping = () => {
    setIsModal("SHIPPING")
  }

  const closeModal = () => {
    setIsModal("")
  }

  return { inventoryData, isModal, openModalShipping, closeModal }
}
