import React from "react"
import { Button, ButtonProps, Flex, Img, Text } from "@sipher.dev/sipher-ui"

interface WalletCardProps extends ButtonProps {
  src: string
  onClick?: () => void
  colorScheme: ButtonProps["colorScheme"]
  text?: string
  isLoading?: boolean
}

export const WalletCard = ({ colorScheme, src, text, onClick, isLoading = false, ...rest }: WalletCardProps) => {
  return (
    <Button
      role="group"
      flex={1}
      h="3rem"
      rounded="base"
      onClick={onClick}
      colorScheme={colorScheme}
      bg={colorScheme === "whiteAlpha" ? "white" : undefined}
      fontWeight={400}
      isLoading={isLoading}
      {...rest}
    >
      <Flex py={2} align="center" w="full" justify={!text ? "center" : "space-between"}>
        {text && (
          <Text fontWeight={600} fontSize="sm" color="neutral.900" ml={2}>
            {text}
          </Text>
        )}
        <Img boxSize="28px" src={src} alt={src.split("/")[1]} />
      </Flex>
    </Button>
  )
}
