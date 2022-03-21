import React from "react"
import Image from "next/image"
import { Flex, Spinner, Text } from "@sipher.dev/sipher-ui"

interface WalletCardProps {
  src: string
  onClick?: () => void
  bg?: string
  text?: string
  isLoading?: boolean
  spinnerColor?: string
}

export const WalletCard = ({
  bg = "neutral.600",
  src,
  text,
  onClick,
  isLoading = false,
  spinnerColor,
}: WalletCardProps) => {
  return (
    <Flex
      role="group"
      align="center"
      flex={1}
      h="3rem"
      rounded="base"
      bg={bg}
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: "accent.600" }}
      _active={{ bg: "blackAlpha.900" }}
      onClick={onClick}
      justify="center"
      transition="all 0.2s ease-in-out"
    >
      {!isLoading ? (
        <>
          <Image width={28} height={28} src={src} alt={src.split("/")[1]} />
          {text && (
            <Text fontSize="sm" color="neutral.900" ml={2}>
              {text}
            </Text>
          )}
        </>
      ) : (
        <Spinner size="sm" color={spinnerColor} />
      )}
    </Flex>
  )
}
