import { MouseEvent, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK, SipherAirdropsAddress } from "@constant"
import { useChakraToast } from "@hooks"
import { AirdropType } from "@sdk"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

interface InputAirdrops {
  id: number
  totalAmount: string
  proof: string[]
}

export const useAirdrops = () => {
  const router = useRouter()
  const currentTab = router.query.tab || AirdropType.ALL.toLowerCase()
  const { bearerToken, user } = useAuth()
  const { account, scCaller, chainId } = useWalletContext()
  const [claimId, setClaimId] = useState<number | null>(null)
  const qc = useQueryClient()
  const toast = useChakraToast()

  const { data: dataAirdrops, isFetched } = useQuery(
    ["airdrops", account],
    () =>
      client.api
        .airdropControllerGetAirdropByType(account!, AirdropType.ALL, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      initialData: {
        nft: [],
        token: [],
        other: [],
        merchandise: [],
      },
    },
  )

  const { data: claimableAmount } = useQuery(
    ["token-claimable-amount", dataAirdrops],
    () =>
      scCaller.current!.SipherAirdrops.getClaimableAmountAtTimestamp(
        dataAirdrops!.token.find(item => item.addressContract === SipherAirdropsAddress)!.totalAmount,
        dataAirdrops!.token.find(item => item.addressContract === SipherAirdropsAddress)!.proof,
      ),
    {
      enabled:
        !!scCaller.current &&
        !!account &&
        dataAirdrops!.token.length > 0 &&
        chainId === ETHEREUM_NETWORK &&
        dataAirdrops!.token.find(item => item.addressContract === SipherAirdropsAddress)!.totalAmount === "0",
      initialData: 0,
    },
  )

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
        qc.invalidateQueries(["airdrops", account])
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
      onView: () => {
        router.push(`?id=${item.id}`, undefined, { scroll: false })
      },
      onClaim: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        claim({ id: item.id, totalAmount: item.totalAmount, proof: item.proof })
      },
    })),
    ...dataAirdrops!.token.map(item => ({
      ...item,
      isClaiming: claimId === item.id,
      isDisabled: true,
      onView: () => {
        router.push(`?id=${item.id}`, undefined, { scroll: false })
      },
      onClaim: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
      },
    })),
    ...dataAirdrops!.merchandise.map(item => ({
      ...item,
      isClaiming: claimId === item.id,
      isDisabled: true,
      onView: () => {
        router.push(`?id=${item.id}`, undefined, { scroll: false })
      },
      onClaim: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
      },
    })),
    ...dataAirdrops!.other.map(item => ({
      ...item,
      isClaiming: claimId === item.id,
      isDisabled: true,
      onView: () => {
        router.push(`?id=${item.id}`, undefined, { scroll: false })
      },
      onClaim: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
      },
    })),
  ]

  return { currentTab, allAirdrops, isFetched }
}
