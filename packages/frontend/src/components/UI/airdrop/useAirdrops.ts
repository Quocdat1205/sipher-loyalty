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

  const { data } = useQuery(
    ["airdrops", currentTab, user, account],
    () =>
      client.api
        .airdropControllerGetAirdropByType(account!, currentTab.toString().toUpperCase(), {
          headers: {
            Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
          },
        })
        .then(res => res.data),
    {
      enabled: authenticated && !!account,
    },
  )
  console.log(currentTab, data)
  return { currentTab }
}
