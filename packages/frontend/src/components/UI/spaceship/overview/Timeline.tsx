import React from "react"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

const data = [
  { id: "Astero", isActive: true, y: "-40%", i: 1 },
  { id: "Aphrodite", isActive: false, y: "50%", i: 2 },
  { id: "Athena", isActive: false, y: "100%", i: 3 },
  { id: "Athena", isActive: false, y: "110%", i: 4 },
  { id: "Poseidon", isActive: false, y: "100%", i: 5 },
  { id: "Artemis", isActive: false, y: "50%", i: 6 },
  { id: "Dionysus", isActive: false, y: "-40%", i: 7 },
]

export const Timeline = () => {
  return (
    <Box pos="relative">
      <svg viewBox="300 300 1200 75" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1">
            {data.map((item, idx) => (
              <stop
                key={idx}
                offset={`${item.i * 14}%`}
                stopColor={"#9091A0"}
                stopOpacity={idx === 0 ? 0.25 : idx < 5 ? idx / (idx * 1.5) : idx === 6 ? 0 : (idx - 1) / (idx * 1.5)}
              />
            ))}
          </linearGradient>
        </defs>
        <path strokeWidth="2" d="M 300 300 C 600 400, 1200 400, 1500 300" stroke="url(#grad1)" fill="transparent" />
      </svg>
      <HStack
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        pos="absolute"
        px={16}
        w="full"
        justify="space-between"
      >
        {data.map((item, idx) => (
          <Flex
            transform={`translateY(${item.y})`}
            justify="center"
            align="center"
            rounded="full"
            zIndex={3}
            pos="relative"
            key={idx}
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
    </Box>
  )
}
