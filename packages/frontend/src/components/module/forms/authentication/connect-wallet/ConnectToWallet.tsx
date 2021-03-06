import { useEffect, useRef, useState } from "react"
import { IoIosWarning } from "react-icons/io"
import { useMutation, useQueryClient } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { ConnectWalletResponse } from "@sipher.dev/ather-id/lib/esm/api/sdk"
import { Box, chakra, Flex, Stack, Text } from "@sipher.dev/sipher-ui"
import { useAuthFlowStore } from "@store"
import useWeb3Wallet from "@web3-wallet"

import { ChakraModal, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

const ConnectToWallet = () => {
  const toast = useChakraToast()

  const { ownedWallets, user } = useAuth()

  const [connectingMethod, setConnectingMethod] = useState<Parameters<typeof activate>["0"] | null>(null)

  const { activate, deactivate, contractCaller, account } = useWeb3Wallet()

  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  const qc = useQueryClient()

  const [isWalledUsed, setIsWalledUsed] = useState(false)

  const [currentAddress, setCurrentAddress] = useState("")

  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, ConnectWalletResponse>(
    async res => {
      const signature = await contractCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        qc.invalidateQueries("owned-wallets")
        setFlowState(null)
      },
      onError: async (e: any) => {
        deactivate()
        if (e?.code === 4001) {
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
        setConnectingMethod(null)
        deactivate()
        const status = e?.toJSON()?.status || 400
        if (status === 401) {
          toast({
            status: "error",
            title: "Network error!",
            message: "Please try again later",
          })
        } else {
          if (!isWalledUsed) setIsWalledUsed(true)
          else
            toast({
              status: "error",
              title: "Wallet linked to other account",
              message: "Please sign in by that wallet or switch to another wallet and try again",
            })
        }
      },
    },
  )

  const willAddWallet = useRef(false)
  const handleConnectWallet = async (connectorId: Parameters<typeof activate>["0"]) => {
    setConnectingMethod(connectorId)
    activate(connectorId)
    willAddWallet.current = true
  }

  useEffect(() => {
    if (account && willAddWallet.current) {
      willAddWallet.current = false
      setCurrentAddress(account)
      if (!ownedWallets.includes(account)) {
        mutateConnectWallet(account)
      } else {
        setConnectingMethod(null)
        setFlowState(null)
      }
    }
  }, [account])

  const handleSignout = async () => {
    await AtherIdAuth.signOut()
    setFlowState(null)
  }

  return (
    <ChakraModal
      title={isWalledUsed ? "WALLET ALREADY IN USE" : "CONNECT TO A WALLET"}
      size="md"
      isOpen={flowState === "connectWallet"}
      hideCloseButton
    >
      <Box pos="relative" px={6} w="full">
        {!isWalledUsed && (
          <Text>
            You're signed in as <chakra.span color="cyan.600">{user?.email}</chakra.span> but you didn't connect to your
            wallet. Please connect to continue!
          </Text>
        )}
        {isWalledUsed && (
          <Box>
            <Box rounded="md" bg="neutral.600" px={4} py={1} mb={4}>
              <Text fontSize={"xs"} color="neutral.400">
                Wallet
              </Text>
              <Text w="full" isTruncated>
                {currentAddress}
              </Text>
            </Box>
            <Flex w="full">
              <Box color="accent.500" mr={1}>
                <IoIosWarning size="1.2rem" />
              </Box>
              <Text color="neutral.400" flex={1}>
                This wallet is connected to an existing Ather Account. You can{" "}
                <chakra.span cursor={"pointer"} onClick={handleSignout} fontWeight={600} color="cyan.600">
                  Sign In
                </chakra.span>{" "}
                now.
              </Text>
            </Flex>
            <Flex align="center" mt={6}>
              <Box flex={1} h="1px" bg="neutral.500" />
              <Text mx={2} fontWeight={600}>
                or Connect to another wallet
              </Text>
              <Box flex={1} h="1px" bg="neutral.500" />
            </Flex>
          </Box>
        )}
        <Stack w="full" spacing={4} mt={4}>
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
    </ChakraModal>
  )
}

export default ConnectToWallet
