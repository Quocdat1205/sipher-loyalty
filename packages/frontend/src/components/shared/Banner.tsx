import React from "react"
import { Box, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

interface BannerProps {
  title: string
  description: string
  srcBg?: string
}

export const Banner = ({ srcBg = "/images/portfolio/banner.png", title, description }: BannerProps) => {
  return (
    <Flex
      w="full"
      justify="center"
      bg={`url(${srcBg})`}
      h={["10rem", "10rem", "10rem", "20rem", "20rem"]}
      bgRepeat="no-repeat"
      bgSize="100%"
      position="relative"
    >
      <Box pt={10} maxW="1200px" w="full">
        <Heading mb={2} fontWeight={600}>
          {title}
        </Heading>
        <Text color="whiteAlpha.800" fontWeight={600} maxW="25rem">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
