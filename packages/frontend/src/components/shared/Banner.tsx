import React from "react"
import Image from "next/image"
import { Box, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

interface BannerProps {
  title: string
  description: string
  srcBg?: string
}

export const Banner = ({ srcBg, title, description }: BannerProps) => {
  return (
    <Flex flexDir="column" w="full" justify="center" position="relative">
      <Image
        blurDataURL="https://via.placeholder.com/728x90.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide%20C/O%20https://placeholder.com/"
        layout="responsive"
        quality={100}
        width={2880}
        height={424}
        src={
          srcBg ||
          "https://via.placeholder.com/728x90.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide%20C/O%20https://placeholder.com/"
        }
        alt={title}
      />
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
