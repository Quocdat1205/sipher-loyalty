import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { AirdropType } from "@sdk"
import { useAuth } from "src/providers/auth"

export const useAirdrops = () => {
  const router = useRouter()
  const currentTab = router.query.tab || AirdropType.ALL
  const { session, authenticated, user } = useAuth()
  const { account } = useWalletContext()

  const { data: dataAirdrops } = useQuery(
    ["airdrops", currentTab, user, account],
    () =>
      client.api
        .airdropControllerGetAirdropByType(account!, AirdropType.ALL, {
          headers: {
            Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
          },
        })
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
      initialData: {
        nft: [],
        token: [],
        merch: [],
      },
    },
  )

  const allAirdrops = [...dataAirdrops!.nft.map(item => item), ...dataAirdrops!.token.map(item => item)]

  return { currentTab, allAirdrops }
}
