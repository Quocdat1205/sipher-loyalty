import React from "react"
import { Box, BoxProps } from "@sipher.dev/sipher-ui"

export const GradientBox = ({ ...rest }: BoxProps) => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      w={["20rem", "30rem"]}
      h={["19rem", "29rem"]}
      zIndex="base"
      bg="radial-gradient(81.64% 52.79% at 30.12% 0%, rgba(32, 33, 46, 0.78) 0%, #1B1C27 100%),
      radial-gradient(58.12% 82.08% at 35.99% 48.07%, #FCD11F 0%, #DF6767 32.65%, #200B9F 100%)"
      {...rest}
    />
  )
}
