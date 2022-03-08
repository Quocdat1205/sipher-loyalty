import { useState } from "react"

const initData = [
  {
    id: 1,
    name: "Sipher Inu #2173",
    collectionId: "0x4d91fa57abfead5fbc8445e45b906b85bbd9744c",
    imageUrl: "/images/nft/sculpture.png",
    isChecked: false,
  },
  {
    id: 2,
    name: "Sipher Inu #2173",
    collectionId: "0x4d91fa57abfead5fbc8445e45b906b85bbd9744c",
    imageUrl: "/images/nft/sculpture.png",
    isChecked: false,
  },
  {
    id: 3,
    name: "Sipher Inu #2173",
    collectionId: "0x4d91fa57abfead5fbc8445e45b906b85bbd9744c",
    imageUrl: "/images/nft/sculpture.png",
    isChecked: false,
  },
]

export const useSculptures = () => {
  const [data, setData] = useState(initData)
  const [isModal, setIsModal] = useState("")

  const sculptureData = data.map(item => ({
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

  return { sculptureData, isModal, openModalShipping, closeModal }
}
