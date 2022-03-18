import React from "react"
import { Box, chakra, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

export const HeaderDetails = () => {
  return (
    <Box pr={4} borderBottom="1px" borderColor="whiteAlpha.100" pb={6}>
      <Heading fontWeight={600}>Lootbox Astero</Heading>
      <Flex align="center" justify="space-between">
        <Text color="neutral.400" fontWeight={600}>
          Quantity: 2
        </Text>
        <Text color="neutral.400" fontWeight={600}>
          Reveal Box in <chakra.span color="white">7D : 1H : 1M</chakra.span>
        </Text>
      </Flex>
    </Box>
  )
}
