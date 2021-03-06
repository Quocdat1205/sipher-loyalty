import React, { forwardRef } from "react"
import { Input, InputProps } from "@sipher.dev/sipher-ui"

export const CustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Input
      bg="neutral.600"
      variant="filled"
      rounded="base"
      py={2}
      h="full"
      border="none"
      _hover={{ bg: "neutral.500" }}
      _focus={{ bg: "neutral.600" }}
      fontWeight={400}
      ref={ref}
      {...props}
    />
  )
})
