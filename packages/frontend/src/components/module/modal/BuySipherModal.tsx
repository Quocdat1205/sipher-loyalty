import React from "react"
import { BsArrowRightShort } from "react-icons/bs"
import { Box, Flex, HStack, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, EthereumIcon, SipherIcon, WalletCard } from "@components/shared"
import { useBalanceContext } from "@hooks"
import { currency } from "@utils"

interface BuySipherModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BuySipherModal = ({ isOpen, onClose }: BuySipherModalProps) => {
  const { dataPrice } = useBalanceContext()

  return (
    <ChakraModal isCentered title={"BUY SIPHER"} isOpen={isOpen} onClose={onClose} size="sm">
      <Stack spacing={4} px={6}>
        <HStack w="full" justify="center" spacing={2}>
          <Flex align="center">
            <SipherIcon />
            <Text ml={2} fontWeight={500} color="neutral.100">
              1
            </Text>
          </Flex>
          <Box color="neutral.500">
            <BsArrowRightShort size="1.5rem" />
          </Box>
          <Flex align="center">
            <EthereumIcon size="1.4rem" />
            <Text fontWeight={500} color="neutral.100">
              {currency(dataPrice!.sipherPrice.usd / dataPrice!.ethereumPrice.usd, "", {
                maximumFractionDigits: 5,
              })}{" "}
              (${currency(dataPrice!.sipherPrice.usd)})
            </Text>
          </Flex>
        </HStack>
        <WalletCard
          onClick={() =>
            window.open(
              "https://kyberswap.com/?utm_source=Sipherwebsite&utm_medium=website&utm_campaign=SipherKyberSwap&utm_id=SipherKyberSwap&utm_content=website#/swap?outputCurrency=0x9F52c8ecbEe10e00D9faaAc5Ee9Ba0fF6550F511&networkId=1",
              "_blank",
            )
          }
          text="Kyber Network"
          src="/images/icons/kyper.png"
          colorScheme={"whiteAlpha"}
          py={2}
        />
        <WalletCard
          onClick={() =>
            window.open(
              "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9F52c8ecbEe10e00D9faaAc5Ee9Ba0fF6550F511&chain=mainnet",
              "_blank",
            )
          }
          text="Uniswap"
          src="/images/icons/uniswap.png"
          colorScheme={"whiteAlpha"}
          py={2}
        />
      </Stack>
    </ChakraModal>
  )
}
