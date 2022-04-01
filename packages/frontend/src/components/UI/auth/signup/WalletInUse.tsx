import { useEffect, useState } from "react"
import { IoIosWarning } from "react-icons/io"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import AtherIdAuth from "@sipher.dev/ather-id"
import { ConnectWalletResponse } from "@sipher.dev/ather-id/lib/esm/api/sdk"
import { Box, chakra, Divider, Flex, Heading, HStack, Link, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

interface WalletInUseUIProps {
  address: string
  setCurrentAddress: (address: string) => void
}

const WalletInUseUI = ({ address, setCurrentAddress }: WalletInUseUIProps) => {
  const toast = useChakraToast()
  const { ownedWallets } = useAuth()
  const [connectingMethod, setConnectingMethod] = useState<Parameters<typeof connect>["0"] | null>(null)
  const { connect, scCaller, reset } = useWalletContext()
  const qc = useQueryClient()
  const router = useRouter()
  const [connectingWallet, setConnectingWallet] = useState("")
  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet, isLoading: isAddingWallet } = useMutation<unknown, unknown, ConnectWalletResponse>(
    async res => {
      const signature = await scCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        qc.invalidateQueries("owned-wallets")
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

  const { mutate: mutateConnectWallet, isLoading: isConnectingWallet } = useMutation<
    ConnectWalletResponse,
    unknown,
    string
  >(account => AtherIdAuth.connectWallet(account), {
    onSuccess: res => mutateAddWallet(res),
    onError: (e: any) => {
      const status = e?.toJSON()?.status || 400
      if (status === 401) {
        toast({
          status: "error",
          title: "Network error!",
          message: "Please try again later",
        })
      } else {
        setCurrentAddress(connectingWallet)
      }
    },
  })

  const isLoading = isConnectingWallet || isAddingWallet

  useEffect(() => {
    if (!isLoading && connectingMethod) {
      setConnectingMethod(null)
    }
  }, [isLoading, connectingMethod])

  const handleConnectWallet = async (connectorId: Parameters<typeof connect>["0"]) => {
    setConnectingMethod(connectorId)
    const account = await connect(connectorId)
    // Try to add wallet to account if not linked yet
    if (account) {
      setConnectingWallet(account)
      mutateConnectWallet(account)
    }
  }
  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        WALLET ALREADY IN USE
      </Heading>
      <Box rounded="md" bg="neutral.600" px={4} py={1} mb={4}>
        <Text fontSize={"xs"} color="neutral.400">
          Wallet
        </Text>
        <Text w="full" isTruncated>
          {address}
        </Text>
      </Box>
      <Flex>
        <Box color="accent.500" mr={1}>
          <IoIosWarning size="1.2rem" />
        </Box>
        <Text color="neutral.400">
          This wallet is connected to an existing Ather Account. You can{" "}
          <Link href="/signin" fontWeight={600} color="cyan.600">
            Sign In
          </Link>{" "}
          now.
        </Text>
      </Flex>
      <Flex align="center" mt={6} mb={4}>
        <Box flex={1} h="1px" bg="neutral.500" />
        <Text mx={2} fontWeight={600}>
          or Connect to another wallet
        </Text>
        <Box flex={1} h="1px" bg="neutral.500" />
      </Flex>
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
    </Box>
  )
}

export default WalletInUseUI
