import React from "react"
import { Box, Button, chakra, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { ClaimCard } from "./ClaimCard"
import { useClaim } from "./useClaim"

export const ClaimContainer = () => {
  const { claimData, mutateOnClaim, isLoading, totalQuantiy } = useClaim()

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
        <Flex mb={4} justify="center">
          <Box py={4} px={6} textAlign="center" bg="blackAlpha.500" borderRadius="0px 0px 16px 16px">
            <Text>
              You have <chakra.span fontWeight={600}>{totalQuantiy} Lootboxes</chakra.span>
            </Text>
            <Text>Content for time</Text>
          </Box>
        </Flex>
        <HStack spacing={4} mb={4} justify="center">
          {claimData.map(item => (
            <ClaimCard
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              expiredDate={item.expiredDate}
              imageUrl={"/images/spaceship/box.png"}
            />
          ))}
        </HStack>
        <Flex w="full" justify="center">
          <Button isLoading={isLoading} onClick={() => mutateOnClaim()}>
            CLAIM LOOTBOXES ({totalQuantiy})
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
