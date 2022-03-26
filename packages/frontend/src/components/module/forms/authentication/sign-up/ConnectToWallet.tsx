import { useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { chakra, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { ChakraModal, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

const ConnectToWallet = ({ onClose }: { onClose: () => void }) => {
  const { connect, scCaller, reset } = useWalletContext()
  const toast = useChakraToast()
  const { ownedWallets } = useAuth()
  const [isOpen, setIsOpen] = useState(true)
  const [connectingMethod, setConnectingMethod] = useState<Parameters<typeof connect>["0"] | null>(null)

  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, string>(
    async account => {
      const res = await AtherIdAuth.connectWallet(account!)
      const signature = await scCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        setIsOpen(false)
      },
      onError: async (e: any) => {
        reset()
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        } else {
          toast({
            status: "error",
            title: "Wallet already connected to another account",
            message: "Please sign in by that address or switch to another address and try again",
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
    // Try to add wallet to account if not linked yet
    if (account && !ownedWallets.includes(account)) {
      mutateAddWallet(account)
    } else setIsOpen(false)
  }

  return (
    <ChakraModal title={"CONNECT TO A WALLET"} size="lg" isOpen={isOpen} onClose={onClose}>
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

        <Text color="neutral.400" textAlign="center">
          Don't have a Wallet?{" "}
          <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
            Learn More
          </chakra.span>
        </Text>
      </Stack>
    </ChakraModal>
  )
}

export default ConnectToWallet
