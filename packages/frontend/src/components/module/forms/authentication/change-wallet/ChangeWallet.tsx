import { useMutation, useQueryClient } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, Divider, Text } from "@sipher.dev/sipher-ui"
import { useAuthFlowStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

const ChangeWallet = () => {
  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])
  const { account, scCaller, reset } = useWalletContext()
  const { ownedWallets, user } = useAuth()
  const toast = useChakraToast()
  const qc = useQueryClient()

  const { mutate: mutateAddWallet, isLoading } = useMutation<unknown, unknown, string>(
    async account => {
      if (ownedWallets.includes(account)) {
        setFlowState(null)
        return
      }
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

  const handleClose = async () => {
    setFlowState(null)
    reset()
    await AtherIdAuth.signOut()
  }

  return (
    <ChakraModal
      title={"WALLET IS NOT CONNECTED"}
      size="lg"
      isOpen={flowState === "changeWallet"}
      onClose={handleClose}
    >
      <Box px={6}>
        <Text mb={6} color="neutral.300">
          This wallet is not connected with your Ather Account. It will request for a sign on wallet extension to
          confirm linking your wallet address to your Ather account.
        </Text>
        <Box bg="neutral.600" rounded="md" p={2} px={3}>
          <Text color="neutral.400" mb={2}>
            Email: {user?.email}
          </Text>
          <Text color="neutral.400" w="full" isTruncated>
            Wallet: {account}
          </Text>
        </Box>
        <Divider my={6} />
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
