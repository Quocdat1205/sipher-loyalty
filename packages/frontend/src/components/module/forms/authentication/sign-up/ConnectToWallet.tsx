import { useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, chakra, Divider, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { ChakraModal, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"

const ConnectToWallet = () => {
  const { connect, account, scCaller } = useWalletContext()
  const toast = useChakraToast()

  const [currentConnector, setCurrentConnector] = useState<string | null>(null)

  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, Parameters<typeof connect>["0"]>(
    async connectorId => {
      setCurrentConnector(connectorId!)
      await connect(connectorId)
      const res = await AtherIdAuth.connectWallet(account!)
      const signature = await scCaller.current?.sign(res.message)
      if (!signature) throw Error("User denied signature")
      await AtherIdAuth.confirmConectWallet(res, signature)
    },
    {
      onSuccess: () => {
        toast({ status: "success", title: "Add wallet successfully" })
      },
      onError: (e: any) => {
        toast({ status: "error", title: "Error", message: e.message })
      },
      onSettled: () => {
        setCurrentConnector(null)
      },
    },
  )

  return (
    <ChakraModal title={"CONNECT TO A WALLET"} size="lg" isOpen={true} hideCloseButton={true}>
      <Stack pos="relative" px={6} spacing={4} w="full">
        <Text color="neutral.300">{`You’ll need to connect wallet to complete the sign up process.`}</Text>
        <HStack w="full" justify="space-between" align="center" spacing={4}>
          <WalletCard
            onClick={() => mutateAddWallet("injected")}
            text={"Metamask"}
            src="/images/icons/wallets/metamask.svg"
            colorScheme={"whiteAlpha"}
            isLoading={currentConnector === "injected"}
          />
          <WalletCard
            onClick={() => mutateAddWallet("walletConnect")}
            text={"ConnectWallet"}
            src="/images/icons/wallets/walletconnect.svg"
            colorScheme={"whiteAlpha"}
            isLoading={currentConnector === "walletConnect"}
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
