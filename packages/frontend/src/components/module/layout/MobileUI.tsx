import React from "react"
import { Box, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

const MobileUI = ({ isLogin = false }) => {
  return (
    <Flex
      pos="relative"
      bg={isLogin ? "#1B42B8" : "neutral.900"}
      display={["flex", "flex", "none"]}
      flexDir="column"
      flex={1}
      w="full"
    >
      <Flex px={4} py={8} mb={32} align="center" justify="center" w="full">
        <Img src="/images/auth/SIPHER.svg" alt="Sipher" h="2.5rem" />
        <Box h="2.5rem" w="1px" bg="neutral.600" mx={8} />
        <Img src="/images/auth/ATHER.svg" alt="Sipher" h="3.2rem" />
      </Flex>
      <Flex zIndex={1} justify="center" flex={1}>
        <Box>
          <Heading color="white" fontWeight={600} mb={4} textAlign="center">
            Hey, you're early!
          </Heading>
          <Text textAlign="center" color={isLogin ? "whiteAlpha.800" : "neutral.300"}>
            Join Loyalty Dashboard on your desktop
          </Text>
          <Text textAlign="center" color={isLogin ? "whiteAlpha.800" : "neutral.300"}>
            Mobile version is on the way
          </Text>
        </Box>
      </Flex>
      {isLogin && (
        <Box w="full" pos="absolute" bottom={0} left="50%" transform="translateX(-50%)">
          <Img m="0 auto" src="/images/auth/gun.png" alt="gun" />
        </Box>
      )}
    </Flex>
  )
}
export default MobileUI
