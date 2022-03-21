import React from "react"
import { Box, Button, chakra, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { useClaim } from "./useClaim"

export const ClaimContainer = () => {
  const { claimDataElement } = useClaim()

  return (
    <Flex
      pos="relative"
      bg="url(/images/spaceship/bg-claim.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
      flexDir="column"
      align="center"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient="linear(180deg, #1B1C27 0%, rgba(27, 28, 39, 0) 52.08%, #1B1C27 100%)"
      />
      <Box zIndex={2} maxW="1200px" w="full" pb={8}>
        <Flex justify="center">
          <Box py={4} px={6} textAlign="center" bg="blackAlpha.500" borderRadius="0px 0px 16px 16px">
            <Text>
              You have <chakra.span fontWeight={600}>10 Lootboxes</chakra.span>
            </Text>
            <Text>Content for time</Text>
          </Box>
        </Flex>
        <HStack spacing={4} mb={4} justify="center">
          {claimDataElement.map(item => item.content)}
        </HStack>
        <Flex w="full" justify="center">
          <Button>CLAIM ALL LOOTBOXES(10)</Button>
        </Flex>
      </Box>
    </Flex>
  )
}
