import React from "react"
import { Box, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

interface BannerProps {
  title: string
  description: string
  srcBg?: string
}

export const Banner = ({ srcBg, title, description }: BannerProps) => {
  return (
    <Flex minH="10rem" flexDir="column" w="full" justify="center" position="relative">
      <Img
        minH="10rem"
        maxH="20rem"
        objectFit="cover"
        w="full"
        src={
          srcBg ||
          "https://via.placeholder.com/728x90.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide%20C/O%20https://placeholder.com/"
        }
        alt={title}
      />
      <Box
        px={[4, 4, 4, 0, 0]}
        pos="absolute"
        left="50%"
        top={"2.5rem"}
        transform="translate(-50%, 0%)"
        maxW="1200px"
        w="full"
      >
        <Heading fontSize="5xl" textTransform="uppercase" color="white" mb={2} fontWeight={600}>
          {title}
        </Heading>
        <Text color="whiteAlpha.800" fontWeight={600} fontSize="lg" maxW="28rem">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
