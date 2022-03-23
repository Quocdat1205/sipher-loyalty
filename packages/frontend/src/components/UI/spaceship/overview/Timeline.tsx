import React from "react"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { SpaceshipDataProps } from "./useOverview"

const opacityArr = ["10%", "40%", "40%", "60%", "80%", "100%", "80%", "60%", "40%", "40%", "10%"]
interface TimelineProps {
  mappedData: SpaceshipDataProps[]
}
export const Timeline = ({ mappedData }: TimelineProps) => {
  return (
    <Box mb={16} pos="relative">
      <svg viewBox="300 300 1200 75" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1">
            {opacityArr.map((item, index) => (
              <stop key={item} offset={`${index * 10}%`} stopColor={"#9091A0"} stopOpacity={item} />
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
        {mappedData.map((item, idx) => (
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
            <>
              <Box bg={item.isActive ? "accent.500" : "neutral.400"} rounded="full" boxSize="12px"></Box>
              <Text
                w="auto"
                whiteSpace="nowrap"
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
            </>
          </Flex>
        ))}
      </HStack>
    </Box>
  )
}
