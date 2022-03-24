import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const usePortFolioHome = () => {
  const router = useRouter()
  const { session, authenticated, user } = useAuth()
  const { account } = useWalletContext()

  const { data: dataInit } = useQuery<any>(
    ["collection", user, account],
    () =>
      client.api
        .collectionControllerGetUserCollection(
          account!,
          {},
          setBearerToken(session?.getIdToken().getJwtToken() as string),
        )
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
      initialData: [],
    },
  )

  const collectionData = dataInit?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${item.collectionSlug}`),
  }))

  console.log(collectionData)

  return { collectionData }
}
export default usePortFolioHome
