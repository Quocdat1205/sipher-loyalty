import { useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { useAuth } from "src/providers/auth"

const usePortFolioHome = () => {
  const router = useRouter()
  const { session, authenticated, user } = useAuth()
  const { account } = useWalletContext()

  const { data: dataInit } = useQuery(
    ["collection", user, account],
    () =>
      client.api
        .collectionControllerGetUserCollection(
          account!,
          {},
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

  const collectionData = dataInit!.map(item => ({ ...item, onView: () => router.push(`/spaceship/${item.id}`) }))

  console.log(collectionData)

  return { collectionData }
}
export default usePortFolioHome
