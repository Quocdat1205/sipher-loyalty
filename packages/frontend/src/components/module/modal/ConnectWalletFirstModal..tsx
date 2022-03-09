import React from "react"
import { Box, chakra, Divider, Flex, HStack, Image, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

interface ConnectWalletFirstModalProps {
  onClose: () => void
}

export const ConnectWalletFirstModal = ({ onClose }: ConnectWalletFirstModalProps) => {
  const { connect } = useWalletContext()

  return (
    <Stack pos="relative" px={6} spacing={6} w="full">
      <Text color="neutral.300">{`You’ll need to connect wallet to complete the sign up process.`}</Text>
      <HStack w="full" justify="space-between" align="center" spacing={6}>
        <Flex
          cursor="pointer"
          onClick={() => {
            connect("injected")
            onClose()
          }}
          justify="space-between"
          p={2}
          bg="neutral.600"
          rounded="base"
          flex={1}
          align="center"
        >
          <Text fontWeight={600}>Metamask</Text>
          <Image src="/images/icons/wallets/metamask.svg" alt="metamask" h="1.6rem" />
        </Flex>
        <Flex
          cursor="pointer"
          onClick={() => {
            connect("walletConnect")
            onClose()
          }}
          justify="space-between"
          p={2}
          bg="neutral.600"
          rounded="base"
          flex={1}
          align="center"
        >
          <Text fontWeight={600}>ConnectWallet</Text>
          <Image src="/images/icons/wallets/walletconnect.svg" alt="walletconnect" h="1.6rem" />
        </Flex>
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
