import { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { useAuth } from "src/providers/auth"

export const collectionSort = [
  { value: "sipherianflash", text: "SIPHER NEKO" },
  { value: "sipheriansurge", text: "SIPHER INU" },
  { value: "siphersculpture", text: "SIPHER Sculpture" },
  { value: "sipherspaceship", text: "SIPHER Spaceship" },
]

export const categoriesSort = [
  { value: "character", text: "Character" },
  { value: "scuplture", text: "Scuplture" },
  { value: "lootbox", text: "Lootbox" },
  { value: "spaceship", text: "Spaceship" },
]

const initFilter = {
  categories: "",
  collection: "",
}

const usePortfolio = () => {
  const router = useRouter()
  const { session, authenticated, user } = useAuth()
  const { account } = useWalletContext()
  const [filter, setFilter] = useState(initFilter)

  const { data: collectionData } = useQuery(
    ["collection", user, account, filter],
    () =>
      client.api
        .collectionControllerGetUserCollection(
          account!,
          { category: filter.categories as "character" | "scuplture" | "lootbox" | "spaceship" | undefined },
          {
            headers: {
              Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
            },
          },
        )
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
      initialData: [],
    },
  )

  console.log(collectionData)

  const handleClick = (collectionId: string | number) => {
    router.push(`/portfolio/${collectionId}`)
  }

  return { collectionData, handleClick, filter, setFilter }
}
export default usePortfolio
