import React from "react"
import { RiArrowRightLine } from "react-icons/ri"
import { Box, Flex, HStack, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, EthereumIcon, SipherIcon } from "@components/shared"

import { WalletConnectCard } from "./ConnectWalletFirstModal."

interface BuySipherModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BuySipherModal = ({ isOpen, onClose }: BuySipherModalProps) => {
  return (
    <ChakraModal isCentered title={"BUY SIPHER"} isOpen={isOpen} onClose={onClose} size="sm">
      <Stack spacing={4} px={6}>
        <HStack spacing={4} justify="center" align="center">
          <Flex align="center">
            <SipherIcon size="1.4rem" />
            <Text ml={2}>1</Text>
          </Flex>
          <Box color="neutral.500">
            <RiArrowRightLine size="1.2rem" />
          </Box>
          <Flex align="center">
            <EthereumIcon size="1.6rem" />
            <Text>0.01 ($0.98)</Text>
          </Flex>
        </HStack>
        <WalletConnectCard
          onClick={() =>
            window.open(
              "https://kyberswap.com/?utm_source=Sipherwebsite&utm_medium=website&utm_campaign=SipherKyberSwap&utm_id=SipherKyberSwap&utm_content=website#/swap?outputCurrency=0x9F52c8ecbEe10e00D9faaAc5Ee9Ba0fF6550F511&networkId=1",
              "_blank",
            )
          }
          text="Kyper Network"
          srcImage="/images/icons/kyper.png"
        />
        <WalletConnectCard
          onClick={() =>
            window.open(
              "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9F52c8ecbEe10e00D9faaAc5Ee9Ba0fF6550F511&chain=mainnet",
              "_blank",
            )
          }
          text="Uniswap"
          srcImage="/images/icons/uniswap.png"
        />
      </Stack>
    </ChakraModal>
  )
}
