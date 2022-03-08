import React from "react"
import { BsArrowRightShort } from "react-icons/bs"
import { Box, Button, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

export const Slide1 = () => {
  return (
    <Flex
      align="center"
      justify="center"
      pos="relative"
      bg={`url(/images/general/dashboard-banner.jpg)`}
      h={["20rem", "22.5rem"]}
      w="full"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box
        display={["none", "block"]}
        textAlign="center"
        pos="absolute"
        top="50%"
        left="25%"
        transform="translate(-50%, -50%)"
      >
        <Heading fontSize="4xl" fontWeight={600}>
          SIPHERIAN SURGE
        </Heading>
        <Text mb={2}>by John Doe</Text>
        <Button>
          View Collection
          <Box ml={2}>
            <BsArrowRightShort size="1.5rem" />
          </Box>
        </Button>
      </Box>
      <Box p={4} display={["block", "none"]} textAlign="center">
        <Heading fontSize="4xl" fontWeight={600}>
          SIPHERIAN
        </Heading>
        <Heading fontSize="4xl" fontWeight={600}>
          SURGE
        </Heading>
        <Button>
          View Collection
          <Box ml={2}>
            <BsArrowRightShort size="1.5rem" />
          </Box>
        </Button>
      </Box>
    </Flex>
  )
}
