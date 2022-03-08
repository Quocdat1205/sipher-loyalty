import React from "react"
import { Box, BoxProps, Image } from "@sipher.dev/sipher-ui"

interface SipherIconProp extends BoxProps {
  size?: string
}

export const SipherIcon = ({ size = "1.2rem", ...rest }: SipherIconProp) => {
  return (
    <Box {...rest}>
      <Image h={size} src={`/icons/sipher.png`} alt={"sipher-icon"} />
    </Box>
  )
}
