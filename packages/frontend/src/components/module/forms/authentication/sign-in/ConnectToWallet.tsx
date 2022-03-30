import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { chakra, Divider, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { AuthType, SignInAction } from "@store"

import { ChakraModal, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { useSignInContext } from "./useSignIn"

const ConnectToWallet = () => {
  const toast = useChakraToast()
  const { ownedWallets } = useAuth()
  const {
    flowState,
    setFlowState,
    wallet: { connect, scCaller, reset },
  } = useSignInContext()

  const [connectingMethod, setConnectingMethod] = useState<Parameters<typeof connect>["0"] | null>(null)

  const qc = useQueryClient()

  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, string>(
    async account => {
      const res = await AtherIdAuth.connectWallet(account!)
      const signature = await scCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        setFlowState(null)
        qc.invalidateQueries("owned-wallets")
      },
      onError: async (e: any) => {
        reset()
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        } else {
          toast({
            status: "error",
            title: "Wallet linked to other account",
            message: "Please sign in by that wallet or switch to another wallet and try again",
          })
        }
      },
      onSettled: () => {
        setConnectingMethod(null)
      },
    },
  )

  const handleConnectWallet = async (connectorId: Parameters<typeof connect>["0"]) => {
    setConnectingMethod(connectorId)
    const account = await connect(connectorId)
    if (account && !ownedWallets.includes(account)) {
      mutateAddWallet(account)
    } else setFlowState(null)
  }

  return (
    <ChakraModal
      closeOnOverlayClick={false}
      hideCloseButton
      title={"CONNECT TO A WALLET"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignIn && flowState.action === SignInAction.ConnectWallet}
      onClose={() => setFlowState(null)}
    >
      <Stack pos="relative" px={6} spacing={4} w="full">
        <HStack w="full" justify="space-between" align="center" spacing={4}>
          <WalletCard
            onClick={() => {
              handleConnectWallet("injected")
            }}
            text={"Metamask"}
            src="/images/icons/wallets/metamask.svg"
            colorScheme={"whiteAlpha"}
            isLoading={connectingMethod === "injected"}
          />
          <WalletCard
            onClick={() => {
              handleConnectWallet("walletConnect")
            }}
            text={"ConnectWallet"}
            src="/images/icons/wallets/walletconnect.svg"
            colorScheme={"whiteAlpha"}
            isLoading={connectingMethod === "walletConnect"}
          />
        </HStack>
        <Divider />
        <Text color="neutral.400" textAlign="center">
          Don't have a Wallet?
          <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
            Learn More
          </chakra.span>
        </Text>
      </Stack>
    </ChakraModal>
  )
}

export default ConnectToWallet
