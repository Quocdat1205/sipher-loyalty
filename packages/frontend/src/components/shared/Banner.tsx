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
      <Image layout="responsive" objectFit="cover" quality={100} width={2880} height={424} src={srcBg} alt={title} />
      <Box
        px={[4, 4, 4, 0, 0]}
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        maxW="1200px"
        w="full"
      >
        <Heading fontSize="4xl" textTransform="uppercase" color="white" mb={2} fontWeight={600}>
          {title}
        </Heading>
        <Text fontWeight={600} color="neutral.100" maxW="28rem">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
