import { useMutation, useQueryClient } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, Text } from "@sipher.dev/sipher-ui"
import { AuthType, ChangeWalletAction, useAuthFlowStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal } from "@components/shared"
import { useChakraToast } from "@hooks"

const ChangeWallet = () => {
  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])
  const { account, scCaller, reset } = useWalletContext()
  const toast = useChakraToast()
  const qc = useQueryClient()

  const { mutate: mutateAddWallet, isLoading } = useMutation<unknown, unknown, string>(
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
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          reset()
          setFlowState(null)
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        } else {
          toast({
            status: "error",
            title: "Wallet linked to other account",
            message: "Please sign in by that wallet or switch to another wallet and try again",
          })
        }
      },
    },
  )

  return (
    <ChakraModal
      title={"CHANGE WALLET"}
      closeOnOverlayClick={false}
      hideCloseButton
      size="lg"
      isOpen={flowState?.type === AuthType.ChangeWallet && flowState.action === ChangeWalletAction.Change}
      onClose={() => {
        setFlowState(null)
        AtherIdAuth.signOut()
        reset()
      }}
    >
      <Box px={6}>
        <Text mb={2}>We detect change in your wallet, please connect this wallet to your account.</Text>
        <Text mb={4}>
          New wallet address: <chakra.span color="cyan.600">{account}</chakra.span>
        </Text>
        <Divider mb={4} />
        <Button
          py={6}
          fontWeight={600}
          w="full"
          fontSize={"md"}
          onClick={() => mutateAddWallet(account!)}
          isDisabled={!account}
          isLoading={isLoading}
        >
          CONNECT
        </Button>
      </Box>
    </ChakraModal>
  )
}

export default ChangeWallet
