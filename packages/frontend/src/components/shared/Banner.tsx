import React from "react"
import { Box, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

export const Banner = ({ title, description }: { title: string; description: string }) => {
  return (
    <Flex
      w="full"
      justify="center"
      bg="url(/images/portfolio/banner.png)"
      h="20rem"
      bgRepeat="no-repeat"
      bgSize="100%"
      position="relative"
    >
      <Box py={10} maxW="1200px" w="full">
        <Heading mb={2} fontWeight={600}>
          {title}
        </Heading>
        <Text maxW="25rem">{description}</Text>
      </Box>
    </Flex>
  )
}
