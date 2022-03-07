import React from "react"
import { Box, BoxProps } from "@sipher.dev/sipher-ui"

export const FormControl = ({ children, ...rest }: BoxProps) => {
  return (
    <Box as="fieldset" mb={4} {...rest}>
      {children}
    </Box>
  )
}
