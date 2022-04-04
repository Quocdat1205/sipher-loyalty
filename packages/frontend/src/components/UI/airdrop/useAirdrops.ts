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
  const { bearerToken } = useAuth()
  const { account, scCaller, chainId } = useWalletContext()
  const [claimId, setClaimId] = useState<number | null>(null)
  const qc = useQueryClient()
  const toast = useChakraToast()
  const [dataToken, setDataToken] = useState<{ totalAmount?: string; proof?: string[] } | undefined>()
  const [isLoadingAirdrops, setIsLoadingAirdrops] = useState(true)

  const { data: claimableAmount, refetch } = useQuery(
    ["token-claimable-amount", dataToken, account],
    () => scCaller.current!.SipherAirdrops.getClaimableAmountAtTimestamp(dataToken!.totalAmount!, dataToken!.proof!),
    {
      enabled:
        !!scCaller.current &&
        !!dataToken &&
        !!dataToken?.totalAmount &&
        !!dataToken?.proof &&
        !!account &&
        chainId === ETHEREUM_NETWORK,
      initialData: 0,
    },
  )

  const { data: airdropsData, isFetched } = useQuery(
    ["airdrops", account],
    () =>
      client.api
        .airdropControllerGetAirdropsByType(account!, AirdropType.ALL, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      onSuccess: data => {
        if (data.token?.length > 0 && chainId === ETHEREUM_NETWORK) {
          const item = data.token.find(
            item => item.addressContract.toLocaleLowerCase() === SipherAirdropsAddress.toLocaleLowerCase(),
          )
          setDataToken({
            totalAmount: item?.totalAmount,
            proof: item?.proof,
          })
          refetch()
        } else {
          setDataToken(undefined)
        }
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
  console.log(dataToken)

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
          buttonText: "Coming soon",
          isClaiming: claimId === item.id,
          isDisabled: true,
          onView: () => {
            router.push(`?type=${item.type}&id=${item.id}`, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          },
        })),
        ...airdropsData!.token?.map(item => ({
          ...item,
          isClaiming: claimId === item.id,
          isDisabled: item?.totalAmount === "0" || chainId !== ETHEREUM_NETWORK || claimableAmount === 0,
          buttonText: "Claim",
          onView: () => {
            router.push(`?type=${item.type}&id=${item.id}`, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            if (item.addressContract.toLocaleLowerCase() === SipherAirdropsAddress.toLocaleLowerCase()) {
              claim(item)
            }
          },
        })),
        ...airdropsData!.merchandise?.map(item => ({
          ...item,
          isClaiming: claimId === item.id,
          isDisabled: true,
          buttonText: "Coming soon",
          onView: () => {
            router.push(`?type=${item.type}&id=${item.id}`, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          },
        })),
        ...airdropsData!.other?.map(item => ({
          ...item,
          buttonText: "Coming soon",
          isClaiming: claimId === item.id,
          isDisabled: true,
          onView: () => {
            router.push(`?type=${item.type}&id=${item.id}`, undefined, { scroll: false })
          },
          onClaim: (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
          },
        })),
      ]
    : []

  return { isLoadingAirdrops, currentTab, allAirdrops, isFetched }
}
