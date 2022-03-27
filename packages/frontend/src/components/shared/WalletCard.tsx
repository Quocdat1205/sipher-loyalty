import React from "react"
import Image from "next/image"
import { Button, ButtonProps, Text } from "@sipher.dev/sipher-ui"

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
      <Image width={28} height={28} src={src} alt={src.split("/")[1]} />
      {text && (
        <Text fontSize="sm" color="neutral.900" ml={2}>
          {text}
        </Text>
      )}
    </Button>
  )
}
