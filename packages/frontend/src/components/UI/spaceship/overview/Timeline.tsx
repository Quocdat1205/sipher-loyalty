import React from "react"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

const data = [
  { id: "Astero", isActive: true, y: "-40%", i: 1 },
  { id: "Aphrodite", isActive: false, y: "50%", i: 2 },
  { id: "Athena", isActive: false, y: "95%", i: 3 },
  { id: "Athena", isActive: false, y: "110%", i: 4 },
  { id: "Poseidon", isActive: false, y: "95%", i: 5 },
  { id: "Artemis", isActive: false, y: "50%", i: 6 },
  { id: "Dionysus", isActive: false, y: "-40%", i: 7 },
]

const opacityArr = [
  { id: 0, opacity: "10%" },
  { id: 1, opacity: "40%" },
  { id: 2, opacity: "40%" },
  { id: 3, opacity: "60%" },
  { id: 4, opacity: "80%" },
  { id: 5, opacity: "100%" },
  { id: 6, opacity: "80%" },
  { id: 7, opacity: "60%" },
  { id: 8, opacity: "40%" },
  { id: 9, opacity: "40%" },
  { id: 10, opacity: "10%" },
]

export const Timeline = () => {
  return (
    <Box pos="relative">
      <svg viewBox="300 300 1200 75" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1">
            {opacityArr.map(item => (
              <stop key={item.id} offset={`${item.id * 10}%`} stopColor={"#9091A0"} stopOpacity={item.opacity} />
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
