import React from "react"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

const data = [
  { id: "Astero", isActive: true },
  { id: "Aphrodite", isActive: false },
  { id: "Athena", isActive: false },
  { id: "Athena", isActive: false },
  { id: "Poseidon", isActive: false },
  { id: "Artemis", isActive: false },
  { id: "Dionysus", isActive: false },
]

export const Timeline = () => {
  return (
    <Box pos="relative">
      <HStack px={16} w="full" justify="space-between">
        {data.map(item => (
          <Flex
            justify="center"
            align="center"
            rounded="full"
            zIndex={3}
            pos="relative"
            key={item.id}
            bg="radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)"
            boxSize="34px"
          >
            <Box bg={item.isActive ? "accent.500" : "neutral.400"} rounded="full" boxSize="12px">
              <Text
                color={item.isActive ? "accent.500" : "white"}
                fontWeight={600}
                fontSize="lg"
                pos="absolute"
                top="0"
                left="50%"
                transform="translate(-50%, -2.5rem)"
              >
                {item.id}
              </Text>
            </Box>
          </Flex>
        ))}
      </HStack>
      <Box
        zIndex={2}
        pos="absolute"
        w="10%"
        h="3px"
        bgGradient="linear(to-r, blackAlpha.400, accent.500)"
        top="50%"
        left="0"
        transform="translateY(-50%)"
      />
      <Box
        pos="absolute"
        w="full"
        h="3px"
        bgGradient="linear(to-r, blackAlpha.400, neutral.400 ,neutral.400, neutral.400, neutral.400,neutral.400, blackAlpha.400 )"
        top="50%"
        left="0"
        transform="translateY(-50%)"
      />
    </Box>
  )
}
