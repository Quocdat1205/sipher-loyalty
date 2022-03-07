import React from "react"
import { Box, BoxProps } from "@sipher.dev/sipher-ui"

import { useChakraToast } from "@hooks"
import { SpCopy } from "./icons"

interface ClipboardProps extends BoxProps {
  text: string
  color?: string
}

export const ClipboardCopy = ({
  text = "",
  color,
  ...rest
}: ClipboardProps) => {
  const toast = useChakraToast()

  const handleClick = () => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied address",
      status: "success",
      duration: 2000,
    })
  }

  return (
    <Box
      cursor="pointer"
      color="neutral.400"
      onClick={() => handleClick()}
      {...rest}
    >
      <SpCopy size="1.2rem" color={color} />
    </Box>
  )
}
