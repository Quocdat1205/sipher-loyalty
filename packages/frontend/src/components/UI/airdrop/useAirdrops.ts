import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { AirdropType } from "@sdk"
import { useAuth } from "src/providers/auth"

export const useAirdrops = () => {
  const router = useRouter()
  const currentTab = router.query.tab || AirdropType.ALL
  const { session, authenticated, user } = useAuth()
  const query = useQueryClient()
  const { account } = useWalletContext()

  const { data } = useQuery(
    ["airdrops", currentTab, user, account],
    () =>
      client.api.airdropControllerGetAirdropByType(account!, currentTab.toString().toUpperCase(), {
        headers: {
          Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
        },
      }),
    {
      enabled: authenticated && !!account,
    },
  )
  console.log(data)
  return { currentTab }
}
