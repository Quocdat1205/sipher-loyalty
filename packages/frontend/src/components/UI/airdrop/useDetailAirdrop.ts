import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK, SipherAirdropsAddress } from "@constant"
import { useChakraToast } from "@hooks"
import { AirdropType } from "@sdk"
import { useAuth } from "src/providers/auth"

export const useDetailAirdrop = () => {
  const router = useRouter()
  const { session, authenticated, user } = useAuth()
  const { account, scCaller, chainId } = useWalletContext()
  const [claimId, setClaimId] = useState<number | null>(null)
  const qc = useQueryClient()
  const toast = useChakraToast()

  const { id: queryId } = router.query
  const onClose = () => {
    router.push("/airdrop", undefined, { scroll: false })
  }

  const isOpen = !!queryId && !!account && authenticated

  //   const { data: dataAirdrops, isFetched } = useQuery(
  //     ["airdrops", currentTab, user, account],
  //     () =>
  //       client.api
  //         .airdropControllerGetAirdropByType(account!, AirdropType.ALL, {
  //           headers: {
  //             Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
  //           },
  //         })
  //         .then(res => res.data),
  //     {
  //       enabled: authenticated && !!account,
  //       initialData: {
  //         nft: [],
  //         token: [],
  //         other: [],
  //         merchandise: [],
  //       },
  //     },
  //   )

  return { router, isOpen, onClose }
}
