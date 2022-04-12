import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import useWeb3Wallet from "@web3-wallet"

import { ETHEREUM_NETWORK, SipherAirdropsAddress } from "@constant"
import { useBalanceContext, useChakraToast } from "@hooks"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

export const useDetailAirdrop = () => {
  const router = useRouter()
  const { bearerToken } = useAuth()
  const { account, contractCaller, chain, switchNetwork } = useWeb3Wallet()
  const {
    balance: { chainPrice },
  } = useBalanceContext()
  const toast = useChakraToast()
  const qc = useQueryClient()
  const { tab, type, id: queryId } = router.query

  const onClose = () => {
    router.push({ query: { tab: tab } }, undefined, { scroll: false })
  }

  const isOpen = !!type && !!queryId && !!account && !!bearerToken

  const { data: detailAirdrop, isFetched } = useQuery(
    ["detailsAirdrops", queryId, account],
    () =>
      client.api
        .airdropControllerGetDetailAirdropByType(
          account!,
          queryId as string,
          type as string,
          setBearerToken(bearerToken),
        )
        .then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
    },
  )

  const { data: initClaimableAmount } = useQuery(
    ["token-claimable-amount", detailAirdrop],
    () =>
      contractCaller.current!.SipherAirdrops.getClaimableAmountAtTimestamp(
        detailAirdrop!.totalAmount,
        detailAirdrop!.proof,
      ),
    {
      enabled:
        !!contractCaller.current &&
        !!account &&
        chain?.id === ETHEREUM_NETWORK &&
        !!detailAirdrop &&
        !!detailAirdrop?.totalAmount,
      initialData: 0,
    },
  )

  const { data: claimedInit } = useQuery(
    ["token-claimed", account],
    () => contractCaller.current!.SipherAirdrops.claimed(),
    {
      enabled:
        !!contractCaller.current && !!account && chain?.id === ETHEREUM_NETWORK && detailAirdrop?.totalAmount !== "0",
      initialData: 0,
    },
  )

  const { mutate: claim, isLoading: isLoadingClaim } = useMutation<
    unknown,
    unknown,
    { totalAmount: string; proof: string[] }
  >(({ totalAmount, proof }) => contractCaller.current!.SipherAirdrops.claim(totalAmount, proof), {
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
    if (chain?.id !== ETHEREUM_NETWORK) {
      switchNetwork(ETHEREUM_NETWORK)
    } else {
      if (chainPrice > 0.1) {
        if (detailAirdrop?.addressContract?.toLowerCase() === SipherAirdropsAddress.toLowerCase()) {
          claim({ totalAmount: detailAirdrop.totalAmount, proof: detailAirdrop.proof })
        }
      } else {
        toast({
          status: "error",
          title: "Error",
          message: "You have insufficient funds to create the transaction",
          duration: 5000,
        })
      }
    }
  }

  const isDisabled =
    detailAirdrop?.addressContract?.toLowerCase() === SipherAirdropsAddress.toLowerCase()
      ? detailAirdrop?.totalAmount === "0" || chain?.id !== ETHEREUM_NETWORK || initClaimableAmount === 0
      : true
  const buttonText =
    detailAirdrop?.addressContract?.toLowerCase() === SipherAirdropsAddress.toLowerCase() ? "CLAIM" : "COMING SOON"
  const tokenClaimed =
    detailAirdrop?.addressContract?.toLowerCase() === SipherAirdropsAddress.toLowerCase() ? claimedInit : 0
  const claimableAmount =
    detailAirdrop?.addressContract?.toLowerCase() === SipherAirdropsAddress.toLowerCase() ? initClaimableAmount : 0

  useEffect(() => {
    onClose()
  }, [account])

  return {
    chainId: chain?.id,
    detailAirdrop,
    router,
    isOpen,
    onClose,
    isFetched,
    handleClaim,
    isLoadingClaim,
    isDisabled,
    tokenClaimed,
    claimableAmount,
    buttonText,
  }
}
