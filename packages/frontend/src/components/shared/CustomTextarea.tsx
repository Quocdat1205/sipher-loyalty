import React from "react"
import { Textarea, TextareaProps } from "@sipher.dev/sipher-ui"

export function CustomTextarea({ ...rest }: TextareaProps) {
  return (
    <Textarea
      resize="none"
      h="10rem"
      bg="neutral.600"
      variant="filled"
      rounded="base"
      py={2}
      _hover={{ bg: "neutral.500" }}
      _focus={{ bg: "neutral.600" }}
      fontWeight={400}
      border="none"
      {...rest}
    />
  )
}
