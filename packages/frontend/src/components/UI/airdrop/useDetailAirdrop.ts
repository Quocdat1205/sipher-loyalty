import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { ETHEREUM_NETWORK, SipherAirdropsAddress } from "@constant"
import { useChakraToast } from "@hooks"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const useDetailAirdrop = () => {
  const router = useRouter()
  const { bearerToken } = useAuth()
  const { account, scCaller, chainId } = useWalletContext()
  const toast = useChakraToast()
  const qc = useQueryClient()
  const { type, id: queryId } = router.query
  const onClose = () => {
    router.push("/airdrop", undefined, { scroll: false })
  }

  const isOpen = !!type && !!queryId && !!account && !!bearerToken

  const { data: detailAirdrop, isFetched } = useQuery(
    ["detailsAirdrops", queryId, account],
    () =>
      client.api
        .airdropControllerGetAirdropByType(account!, queryId as string, type as string, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
    },
  )

  const { data: claimableAmount } = useQuery(
    ["token-claimable-amount", detailAirdrop],
    () =>
      scCaller.current!.SipherAirdrops.getClaimableAmountAtTimestamp(detailAirdrop!.totalAmount, detailAirdrop!.proof),
    {
      enabled: !!scCaller.current && !!account && chainId === ETHEREUM_NETWORK && detailAirdrop!.totalAmount !== "0",
      initialData: 0,
    },
  )

  const { data: claimedInit } = useQuery(["token-claimed", account], () => scCaller.current!.SipherAirdrops.claimed(), {
    enabled: !!scCaller.current && !!account && chainId === ETHEREUM_NETWORK && detailAirdrop!.totalAmount !== "0",
    initialData: 0,
  })

  const { mutate: claim, isLoading: isLoadingClaim } = useMutation<
    unknown,
    unknown,
    { totalAmount: string; proof: string[] }
  >(({ totalAmount, proof }) => scCaller.current!.SipherAirdrops.claim(totalAmount, proof), {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Transaction pending",
        message: "Please review your wallet notifications.",
        duration: 10000,
      })
      qc.invalidateQueries(["token-claimable-amount", detailAirdrop])
    },
    onError: (err: any) => {
      toast({
        status: "error",
        title: "Transaction error",
        message: err.message,
        duration: 10000,
      })
    },
  })

  const handleClaim = () => {
    if (detailAirdrop?.addressContract === SipherAirdropsAddress) {
      claim({ totalAmount: detailAirdrop.totalAmount, proof: detailAirdrop.proof })
    }
  }

  const isDisabled =
    detailAirdrop?.totalAmount === "0" ||
    chainId !== ETHEREUM_NETWORK ||
    claimableAmount === 0 ||
    detailAirdrop?.type !== "TOKEN"

  const tokenClaimed = detailAirdrop?.addressContract === SipherAirdropsAddress ? claimedInit : 0

  return { detailAirdrop, router, isOpen, onClose, isFetched, handleClaim, isLoadingClaim, isDisabled, tokenClaimed }
}
