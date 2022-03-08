import React from "react"
import { Box, BoxProps, Image } from "@sipher.dev/sipher-ui"

interface EthereumIconProp extends BoxProps {
  isWETH?: boolean
  size?: string
}

export const EthereumIcon = ({ isWETH = false, size = "1.2rem", ...rest }: EthereumIconProp) => {
  return (
    <Box {...rest}>
      <Image h={size} src={`/icons${isWETH ? "/weth.svg" : "/eth.svg"}`} alt={isWETH ? "weth-icon" : "eth-icon"} />
    </Box>
  )
}
