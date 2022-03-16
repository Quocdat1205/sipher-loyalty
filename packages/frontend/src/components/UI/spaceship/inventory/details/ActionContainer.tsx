import React from "react"
import { ImPriceTag } from "react-icons/im"
import { Box, Button, chakra, HStack } from "@sipher.dev/sipher-ui"

export const ActionContainer = () => {
  return (
    <Box
      px={4}
      pos="sticky"
      bottom={0}
      bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(51, 52, 74, 0) 100%)"
      backdropFilter="blur(10px)"
      py={4}
      borderTop="1px"
      borderColor="neutral.600"
    >
      <HStack spacing={4}>
        <Box flex={1}></Box>
        <Box flex={1}>
          <Button
            py={5}
            colorScheme="accent"
            w="full"
            leftIcon={
              <chakra.span transform={"auto"} rotate={"-100deg"}>
                <ImPriceTag />
              </chakra.span>
            }
          >
            MINT NFT
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}
