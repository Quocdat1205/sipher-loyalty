import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK, SipherAirdropsAddress } from "@constant"
import { useChakraToast } from "@hooks"
import { AirdropType } from "@sdk"
import { useAuth } from "src/providers/auth"

interface InputAirdrops {
  id: string
  totalAmount: string
  proof: string[]
}

export const useAirdrops = () => {
  const router = useRouter()
  const currentTab = router.query.tab || AirdropType.ALL.toLowerCase()
  const { session, authenticated, user } = useAuth()
  const { account, scCaller, chainId } = useWalletContext()
  const [claimId, setClaimId] = useState<string | null>(null)
  const qc = useQueryClient()
  const toast = useChakraToast()

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

  const { data: claimableAmount } = useQuery(
    ["token-claimable-amount", dataAirdrops],
    () =>
      scCaller.current!.SipherAirdrops.getClaimableAmountAtTimestamp(
        account!,
        dataAirdrops!.token.find(item => item.addressContract === SipherAirdropsAddress)!.totalAmount,
        dataAirdrops!.token.find(item => item.addressContract === SipherAirdropsAddress)!.proof,
      ),
    {
      enabled: !!scCaller.current && !!account && dataAirdrops!.token.length > 0 && chainId === ETHEREUM_NETWORK,
      initialData: 0,
    },
  )
  console.log(claimableAmount)

  const { mutate: claim } = useMutation<unknown, unknown, InputAirdrops>(
    ({ totalAmount, proof }) => scCaller.current!.SipherAirdrops.claim(totalAmount, proof),
    {
      onMutate: ({ id }) => {
        setClaimId(id)
      },
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        qc.invalidateQueries(["airdrops", currentTab, user, account])
        qc.invalidateQueries(["token-claimable-amount", dataAirdrops])
      },
      onSettled: () => {
        setClaimId(null)
      },
      onError: (err: any) => {
        toast({
          status: "error",
          title: "Transaction error",
          message: err.message,
          duration: 10000,
        })
      },
    },
  )

  const allAirdrops = [
    ...dataAirdrops!.nft.map(item => ({
      ...item,
      isClaiming: claimId === item.id,
      isDisabled: chainId !== ETHEREUM_NETWORK && claimableAmount !== 0,
      onClaim: () => {
        claim({ id: item.id, totalAmount: item.totalAmount, proof: item.proof })
      },
    })),
    ...dataAirdrops!.token.map(item => ({
      ...item,
      isClaiming: claimId === item.id,
      isDisabled: true,
      onClaim: () => {
        console.log("claim")
      },
    })),
    ...dataAirdrops!.merch.map(item => ({
      ...item,
      isClaiming: claimId === item.id,
      isDisabled: true,
      onClaim: () => {
        console.log("claim")
      },
    })),
  ]

  return { currentTab, allAirdrops }
}
