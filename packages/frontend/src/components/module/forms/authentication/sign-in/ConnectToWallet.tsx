import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, chakra, Divider, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { WalletConnectCard } from "@components/module/modal"
import { ChakraModal } from "@components/shared"
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
        if (!signature) throw Error("User denied signature")
        await AtherIdAuth.confirmConectWallet(res, signature)
      }
    },
    {
      onSuccess: () => {
        toast({ status: "success", title: "Connect wallet successfully" })
      },
      onError: (e: any) => {
        toast({ status: "error", title: "Error", message: e.message })
      },
      onSettled: () => {
        setIsOpen(false)
      },
    },
  )

  return (
    <ChakraModal title={"CONNECT TO A WALLET"} size="lg" isOpen={isOpen} hideCloseButton={true}>
      <Stack pos="relative" px={6} spacing={6} w="full">
        <HStack w="full" justify="space-between" align="center" spacing={6}>
          <WalletConnectCard
            onClick={() => {
              mutateAddWallet("injected")
            }}
            text={"Metamask"}
            srcImage="/images/icons/wallets/metamask.svg"
          />
          <WalletConnectCard
            onClick={() => {
              mutateAddWallet("walletConnect")
            }}
            text={"ConnectWallet"}
            srcImage="/images/icons/wallets/walletconnect.svg"
          />
        </HStack>
        <Box>
          <Divider pos="absolute" left="0" w="full" borderColor="whiteAlpha.100" />
        </Box>
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
