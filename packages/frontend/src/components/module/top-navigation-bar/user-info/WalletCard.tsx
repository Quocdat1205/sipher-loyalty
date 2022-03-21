import React from "react"
import Image from "next/image"
import { Flex, Text } from "@sipher.dev/sipher-ui"

interface WalletCardProps {
  src: string
  onClick?: () => void
  bg?: string
  text?: string
}

export const WalletCard = ({ bg = "neutral.600", src, text, onClick }: WalletCardProps) => {
  return (
    <Flex
      role="group"
      align="center"
      flex={1}
      p={3}
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
      <Image width={28} height={28} src={src} alt={src.split("/")[1]} />
      {text && (
        <Text fontSize="sm" color="neutral.900" ml={2}>
          {text}
        </Text>
      )}
    </Flex>
  )
}
