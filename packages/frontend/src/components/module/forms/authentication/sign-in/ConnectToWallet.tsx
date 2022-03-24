import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { chakra, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { ChakraModal, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"

const ConnectToWallet = () => {
  const { connect, scCaller } = useWalletContext()
  const toast = useChakraToast()

  const [isOpen, setIsOpen] = useState(true)

  const { data: ownedWallets } = useQuery("owned-wallets", () => AtherIdAuth.ownedWallets(), { initialData: [] })
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, Parameters<typeof connect>["0"]>(
    async connectorId => {
      const account = await connect(connectorId)
      if (!ownedWallets?.map(w => w.address).includes(account!)) {
        const res = await AtherIdAuth.connectWallet(account!)
        const signature = await scCaller.current?.sign(res.message)
        await AtherIdAuth.confirmConectWallet(res, signature!)
      }
    },
    {
      onError: async (e: any) => {
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        } else {
          toast({ status: "error", title: "Error", message: e.message })
        }
      },
      onSettled: () => {
        setIsOpen(false)
      },
    },
  )

  return (
    <ChakraModal title={"CONNECT TO A WALLET"} size="lg" isOpen={isOpen} hideCloseButton={true}>
      <Stack pos="relative" px={6} spacing={4} w="full">
        <HStack w="full" justify="space-between" align="center" spacing={4}>
          <WalletCard
            onClick={() => {
              mutateAddWallet("injected")
            }}
            text={"Metamask"}
            src="/images/icons/wallets/metamask.svg"
            colorScheme={"whiteAlpha"}
          />
          <WalletCard
            onClick={() => {
              mutateAddWallet("walletConnect")
            }}
            text={"ConnectWallet"}
            src="/images/icons/wallets/walletconnect.svg"
            colorScheme={"whiteAlpha"}
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
