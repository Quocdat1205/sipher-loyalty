import React from "react"
import { Box, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

interface BannerProps {
  title: string
  description: string
  srcBg?: string
}

export const Banner = ({ srcBg = "/images/portfolio/banner.png", title, description }: BannerProps) => {
  return (
    <Flex w="full" justify="center" bg={`url(${srcBg})`} bgRepeat="no-repeat" bgSize="100%" position="relative">
      <Box pt={8} pb={24} maxW="1200px" w="full">
        <Heading fontSize="4xl" textTransform="uppercase" color="white" mb={2} fontWeight={600}>
          {title}
        </Heading>
        <Text color="neutral.100" maxW="25rem">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
