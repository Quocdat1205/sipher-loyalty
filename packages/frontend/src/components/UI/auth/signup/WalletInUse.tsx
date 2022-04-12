import { useEffect, useRef, useState } from "react"
import { IoIosWarning } from "react-icons/io"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import AtherIdAuth from "@sipher.dev/ather-id"
import { ConnectWalletResponse } from "@sipher.dev/ather-id/lib/esm/api/sdk"
import { Box, chakra, Flex, Heading, Stack, Text } from "@sipher.dev/sipher-ui"
import useWeb3Wallet, { ConnectorId } from "@web3-wallet"

import { WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"

interface WalletInUseUIProps {
  address: string
  setCurrentAddress: (address: string) => void
}

const WalletInUseUI = ({ address, setCurrentAddress }: WalletInUseUIProps) => {
  const toast = useChakraToast()
  const [connectingMethod, setConnectingMethod] = useState<ConnectorId | null>(null)
  const { activate, contractCaller, deactivate, account } = useWeb3Wallet()
  const qc = useQueryClient()
  const router = useRouter()
  const [connectingWallet, setConnectingWallet] = useState("")
  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, ConnectWalletResponse>(
    async res => {
      const signature = await contractCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        qc.invalidateQueries("owned-wallets")
        router.push("/")
      },
      onError: async (e: any) => {
        deactivate()
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
          toast({
            status: "error",
            title: "Wallet linked to other account",
            message: "Please sign in by that wallet or switch to another wallet and try again",
          })
          setCurrentAddress(connectingWallet)
        }
      },
    },
  )

  const willConnectWallet = useRef(false)
  const handleConnectWallet = async (connectorId: ConnectorId) => {
    setConnectingMethod(connectorId)
    if (!account) {
      activate(connectorId)
    } else {
      setConnectingWallet(account)
      mutateConnectWallet(account)
    }
  }

  useEffect(() => {
    if (account && willConnectWallet.current) {
      willConnectWallet.current = false
      setConnectingWallet(account)
      mutateConnectWallet(account)
    }
  }, [account])

  const handleClose = async () => {
    deactivate()
    await AtherIdAuth.signOut()
    router.push("/signin")
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
          <chakra.span cursor={"pointer"} onClick={handleClose} fontWeight={600} color="cyan.600">
            Sign In
          </chakra.span>{" "}
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

      <Stack w="full" spacing={4}>
        <WalletCard
          onClick={() => {
            handleConnectWallet("metaMask")
          }}
          text={"MetaMask"}
          src="/images/icons/wallets/metamask.svg"
          colorScheme={"whiteAlpha"}
          isLoading={connectingMethod === "metaMask"}
        />
        <WalletCard
          onClick={() => {
            handleConnectWallet("coinbaseWallet")
          }}
          text={"Coinbase"}
          src="/images/icons/wallets/coinbase.svg"
          colorScheme={"whiteAlpha"}
          isLoading={connectingMethod === "coinbaseWallet"}
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
      </Stack>
    </Box>
  )
}

export default WalletInUseUI
