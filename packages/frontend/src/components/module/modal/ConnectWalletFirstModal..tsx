import React from "react"
import Image from "next/image"
import { Box, chakra, Divider, Flex, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

interface ConnectWalletFirstModalProps {
  onClose: () => void
}

const WalletConnectCard = ({ onClick, text, srcImage }) => {
  return (
    <Flex
      bg="white"
      color="neutral.900"
      cursor="pointer"
      onClick={onClick}
      justify="center"
      p={3}
      rounded="base"
      flex={1}
      align="center"
      userSelect="none"
      _hover={{ bg: "accent.600" }}
      _active={{ bg: "blackAlpha.900" }}
      transition="all 0.2s ease-in-out"
    >
      <Image src={srcImage} alt={text} width={28} height={28} />
      <Text ml={2} fontSize="sm">
        {text}
      </Text>
    </Flex>
  )
}

export const ConnectWalletFirstModal = ({ onClose }: ConnectWalletFirstModalProps) => {
  const { connect } = useWalletContext()

  return (
    <Stack pos="relative" px={6} spacing={6} w="full">
      <Text color="neutral.300">{`You’ll need to connect wallet to complete the sign up process.`}</Text>
      <HStack w="full" justify="space-between" align="center" spacing={6}>
        <WalletConnectCard
          onClick={() => {
            connect("injected")
            onClose()
          }}
          text="Metamask"
          srcImage="/images/icons/wallets/metamask.svg"
        />
        <WalletConnectCard
          onClick={() => {
            connect("walletConnect")
          }}
          text="ConnectWallet"
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
