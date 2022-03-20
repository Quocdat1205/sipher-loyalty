import { useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, chakra, Divider, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { WalletConnectCard } from "@components/module/modal"
import { useChakraToast } from "@hooks"

const ConnectToWallet = () => {
  const { connect, account, scCaller } = useWalletContext()
  const toast = useChakraToast()

  const [currentConnector, setCurrentConnector] = useState<string | null>(null)
  const [progress, setProgress] = useState("Loading")

  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, Parameters<typeof connect>["0"]>(
    async connectorId => {
      setCurrentConnector(connectorId!)
      setProgress("Signing")
      await connect(connectorId)
      const res = await AtherIdAuth.connectWallet(account!)
      const signature = await scCaller.current?.sign(res.message)
      if (!signature) throw Error("User denied signature")
      setProgress("Connecting")
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
        setProgress("Loading")
      },
    },
  )

  return (
    <Stack pos="relative" px={6} spacing={6} w="full">
      <Text color="neutral.300">{`You’ll need to connect wallet to complete the sign up process.`}</Text>
      <HStack w="full" justify="space-between" align="center" spacing={6}>
        <WalletConnectCard
          onClick={() => {
            mutateAddWallet("injected")
          }}
          text={currentConnector === "injected" ? progress : "Metamask"}
          srcImage="/images/icons/wallets/metamask.svg"
        />
        <WalletConnectCard
          onClick={() => {
            mutateAddWallet("walletConnect")
          }}
          text={currentConnector === "walletConnect" ? progress : "ConnectWallet"}
          srcImage="/images/icons/wallets/walletconnect.svg"
        />
      </HStack>
      <Box pb={2}>
        <Divider pos="absolute" left="0" w="full" borderColor="whiteAlpha.100" />
      </Box>
      <Text color="neutral.400" textAlign="center">
        Don't have a Wallet?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
          Learn More
        </chakra.span>
      </Text>
    </Stack>
  )
}

export default ConnectToWallet
