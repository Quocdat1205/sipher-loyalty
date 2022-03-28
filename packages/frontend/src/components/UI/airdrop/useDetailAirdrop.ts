import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const useDetailAirdrop = () => {
  const router = useRouter()
  const { bearerToken } = useAuth()
  const { account } = useWalletContext()

  const { type, id: queryId } = router.query
  const onClose = () => {
    router.push("/airdrop", undefined, { scroll: false })
  }

  const isOpen = !!type && !!queryId && !!account && !!bearerToken

  const { data: detailAirdrop, isFetched } = useQuery(
    ["airdrops", queryId, account],
    () =>
      client.api
        .airdropControllerGetAirdropByType(account!, queryId as string, type as string, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
    },
  )

  return { detailAirdrop, router, isOpen, onClose, isFetched }
}
