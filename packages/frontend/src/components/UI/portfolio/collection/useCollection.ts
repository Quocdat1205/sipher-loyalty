import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { useAuth } from "src/providers/auth"

export const useCollection = () => {
  const router = useRouter()
  const { session, authenticated, user } = useAuth()
  const { account } = useWalletContext()

  useQuery(
    ["collection", user, account],
    () =>
      client.api
        .collectionControllerGetPortfolioByCollection(account!, "NEKO", {
          headers: {
            Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
          },
        })
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
    },
  )

  const handleClick = (collectionId: string | number) => {
    router.push(`/portfolio/${collectionId}`)
  }

  return { handleClick }
}
