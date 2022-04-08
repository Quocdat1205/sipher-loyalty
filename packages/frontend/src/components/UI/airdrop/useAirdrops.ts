import { MouseEvent, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { SipherAirdropsAddress } from "@constant"
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
  const { bearerToken } = useAuth()
  const { account, scCaller } = useWalletContext()
  const [claimId, setClaimId] = useState<number | null>(null)
  const qc = useQueryClient()
  const toast = useChakraToast()
  const [isLoadingAirdrops, setIsLoadingAirdrops] = useState(true)

  const { data: airdropsData, isFetched } = useQuery(
    ["airdrops", account],
    () =>
      client.api
        .airdropControllerGetAirdropsByType(account!, AirdropType.ALL, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      onSuccess: () => {
        setIsLoadingAirdrops(false)
      },
      initialData: {
        nft: [],
        token: [],
        other: [],
        merchandise: [],
      },
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
        qc.invalidateQueries(["token-claimable-amount", airdropsData])
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

  const allAirdrops = airdropsData
    ? [
        ...airdropsData!.nft?.map(item => ({
          ...item,
          buttonText: "",
          isClaiming: claimId === item.id,
          isClaimer: true,
          isDisabled: true,
          onView: () => {
            router.push({ query: { tab: currentTab, type: item.type, id: item.id } }, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          },
        })),
        ...airdropsData!.token?.map(item => ({
          ...item,
          isClaiming: claimId === item.id,
          isClaimer: account?.toLowerCase() === item.claimer.toLowerCase(),
          buttonText: "",
          onView: () => {
            if (account === item.claimer) {
              router.push({ query: { tab: currentTab, type: item.type, id: item.id } }, undefined, { scroll: false })
            }
          },
          onClaim: () => {
            if (item.addressContract.toLocaleLowerCase() === SipherAirdropsAddress.toLocaleLowerCase()) {
              claim(item)
            }
          },
        })),
        ...airdropsData!.merchandise?.map(item => ({
          ...item,
          isClaiming: claimId === item.id,
          isDisabled: true,
          isClaimer: true,
          buttonText: "Coming soon",
          onView: () => {
            router.push({ query: { tab: currentTab, type: item.type, id: item.id } }, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          },
        })),
        ...airdropsData!.other?.map(item => ({
          ...item,
          buttonText: "",
          isClaiming: claimId === item.id,
          isClaimer: true,
          isDisabled: true,
          onView: () => {
            router.push({ query: { tab: currentTab, type: item.type, id: item.id } }, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          },
        })),
      ]
    : []

  const totalMerch = allAirdrops.filter(item => item.type === "MERCH").reduce((acc, curr) => acc + curr.quantity, 0)

  return { totalMerch, isLoadingAirdrops, currentTab, allAirdrops, isFetched }
}
