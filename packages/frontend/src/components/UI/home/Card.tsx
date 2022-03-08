import React from "react"
import { Box } from "@chakra-ui/react"

interface Props {
  children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return (
    <Box
      width="19%"
      boxSizing="border-box"
      bg="#292A40"
      borderRadius="8px"
      paddingBottom="1rem"
      position="relative"
      margin="1rem 0.5%"
    >
      {children}
    </Box>
  )
}

export default Card
