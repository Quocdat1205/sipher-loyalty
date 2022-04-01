import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import AtherIdAuth from "@sipher.dev/ather-id"
import { ConnectWalletResponse } from "@sipher.dev/ather-id/lib/esm/api/sdk"
import { Box, chakra, Divider, Heading, HStack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { SignUpStep } from "./SignUpUI"

interface ConnectWalletUIProps {
  setStep: (step: SignUpStep) => void
  setCurrentAddress: (address: string) => void
}

const ConnectWalletUI = ({ setStep, setCurrentAddress }: ConnectWalletUIProps) => {
  const toast = useChakraToast()
  const [connectingMethod, setConnectingMethod] = useState<Parameters<typeof connect>["0"] | null>(null)
  const { connect, scCaller, reset, isActive, account } = useWalletContext()
  const { refetchOwnedWallets } = useAuth()
  const qc = useQueryClient()
  const router = useRouter()
  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, ConnectWalletResponse>(
    async res => {
      const signature = await scCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: async () => {
        await qc.invalidateQueries("owned-wallets")
        router.push("/")
      },
      onError: async (e: any) => {
        reset()
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        }
      },
      onSettled: () => {
        setConnectingMethod(null)
      },
    },
  )

  const { mutate: mutateConnectWallet } = useMutation<ConnectWalletResponse, unknown, string>(
    account => AtherIdAuth.connectWallet(account),
    {
      onSuccess: res => mutateAddWallet(res),
      onError: (e: any) => {
        const status = e?.toJSON()?.status || 400
        setConnectingMethod(null)
        if (status === 401) {
          toast({
            status: "error",
            title: "Network error!",
            message: "Please try again later",
          })
        } else {
          setStep(SignUpStep.WalletInUse)
        }
      },
    },
  )

  // case 1: wallet is not active
  // case 2: wallet is active but not linked to any account
  const handleConnectWallet = async (connectorId: Parameters<typeof connect>["0"]) => {
    setConnectingMethod(connectorId)
    let currentAccount = account
    if (!currentAccount) {
      currentAccount = (await connect(connectorId)) || null
    }
    const ownedWallets = await refetchOwnedWallets()
      .then(res => res.data)
      .then(data => data?.map(wallet => wallet.address))
    // Try to add wallet to account if not linked yet
    if (currentAccount && ownedWallets && !ownedWallets.includes(currentAccount.toLowerCase())) {
      setCurrentAddress(currentAccount)
      mutateConnectWallet(currentAccount)
    } else setConnectingMethod(null)
  }
  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        CONNECT TO A WALLET
      </Heading>
      <Text mb={6} color="neutral.300">
        Please link your crypto-wallet in order to complete the sign up process. This will only be used to link to your
        account. Funds will not be withdrawn and no minimum balance required.
      </Text>
      <HStack w="full" justify="space-between" align="center" spacing={4}>
        <WalletCard
          onClick={() => {
            handleConnectWallet("injected")
          }}
          text={"MetaMask"}
          src="/images/icons/wallets/metamask.svg"
          colorScheme={"whiteAlpha"}
          isLoading={connectingMethod === "injected"}
        />
        <WalletCard
          onClick={() => {
            handleConnectWallet("walletConnect")
          }}
          text={"WalletConnect"}
          src="/images/icons/wallets/walletconnect.svg"
          colorScheme={"whiteAlpha"}
          isLoading={connectingMethod === "walletConnect"}
        />
      </HStack>
      <Divider my={6} />
      <Text color="neutral.400" textAlign="center">
        Don't have a Wallet?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
          Learn More
        </chakra.span>
      </Text>
    </Box>
  )
}

export default ConnectWalletUI
