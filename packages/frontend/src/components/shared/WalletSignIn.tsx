import { MdInfo } from "react-icons/md"
import { Box, BoxProps, Flex, HStack, Link, Text } from "@sipher.dev/sipher-ui"

import { CustomPopover, WalletCard } from "@components/shared"

interface WalletSignInProps extends BoxProps {
  onMetamaskConnect: () => void
  onWalletConnectConnect: () => void
  onCoinbaseConnect: () => void
  connectingMethod: string | null
}

export const WalletSignIn = ({
  onMetamaskConnect,
  onWalletConnectConnect,
  onCoinbaseConnect,
  connectingMethod,
  ...rest
}: WalletSignInProps) => {
  return (
    <Box {...rest}>
      <Flex pb={2} align="center">
        <Text mr={2} color="neutral.400" fontSize="sm">
          Crypto Wallet
        </Text>
        <CustomPopover
          placement="top"
          label="Crypto-wallet"
          icon={
            <Box color="neutral.500">
              <MdInfo size="1.2rem" />
            </Box>
          }
        >
          <Text fontSize="sm" color="neutral.900">
            Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms. For more
            infomation about wallets, see this{" "}
            <Link
              isExternal
              href="https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/"
              color="cyan.500"
              textDecor="underline"
            >
              explanation
            </Link>
          </Text>
        </CustomPopover>
      </Flex>
      <HStack spacing={4}>
        <WalletCard
          w="full"
          colorScheme={"whiteAlpha"}
          src="/images/icons/wallets/metamask.svg"
          onClick={onMetamaskConnect}
          isLoading={connectingMethod === "metaMask"}
        />
        <WalletCard
          colorScheme={"whiteAlpha"}
          src="/images/icons/wallets/coinbase.svg"
          onClick={onCoinbaseConnect}
          isLoading={connectingMethod === "coinbaseWallet"}
        />
        <WalletCard
          colorScheme={"whiteAlpha"}
          src="/images/icons/wallets/walletconnect.svg"
          onClick={onWalletConnectConnect}
          isLoading={connectingMethod === "walletConnect"}
        />
      </HStack>
    </Box>
  )
}
