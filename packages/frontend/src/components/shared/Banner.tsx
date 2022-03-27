import React from "react"
import Image from "next/image"
import { Box, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

interface BannerProps {
  title: string
  description: string
  srcBg?: string
}

export const Banner = ({ srcBg = "/images/portfolio/banner.png", title, description }: BannerProps) => {
  return (
    <Flex flexDir="column" w="full" justify="center" position="relative">
      <Image layout="responsive" quality={100} width={1440} height={212} src={srcBg} alt={title} />
      <Box px={4} pos="absolute" top="50%" left="50%" transform="translate(-50%,-75%)" maxW="1200px" w="full">
        <Heading fontSize="4xl" textTransform="uppercase" color="white" mb={2} fontWeight={600}>
          {title}
        </Heading>
        <Text fontWeight={600} color="neutral.100" maxW="25rem">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
