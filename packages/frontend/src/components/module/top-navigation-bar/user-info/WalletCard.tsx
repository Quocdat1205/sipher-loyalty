import React from "react"
import { Flex, Img } from "@sipher.dev/sipher-ui"

interface WalletCardProps {
  src: string
  onClick: () => void
  bg?: string
}

export const WalletCard = ({ bg = "neutral.600", src, onClick }: WalletCardProps) => {
  return (
    <Flex
      role="group"
      align="center"
      flex={1}
      px={4}
      py={3}
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
      <Img src={src} alt={src} h="1.6rem" />
    </Flex>
  )
}
