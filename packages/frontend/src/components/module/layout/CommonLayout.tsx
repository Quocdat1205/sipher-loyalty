import { ReactNode } from "react"
import { Box, Flex, Text } from "@sipher.dev/sipher-ui"

import { TopNavigationBar } from "../top-navigation-bar"

export const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex pos="relative" minH="100vh" w="full" direction="column" color="whiteAlpha.900" bg="neutral.900">
      <Flex display={["none", "none", "flex"]} flexDir="column" flex={1} w="full">
        <TopNavigationBar isSticky />
        <Flex flexDir="column" zIndex={2} flex={1}>
          {children}
        </Flex>
      </Flex>
      <Flex display={["flex", "flex", "none"]} flexDir="column" flex={1} w="full">
        <TopNavigationBar isSticky />
        <Flex align="center" justify="center" flex={1}>
          <Box bg="accent.500" rounded="lg" p={4}>
            <Text fontSize="xl" textAlign="center" color="neutral.900" fontWeight={600} maxW="20rem">
              Join Loyalty Dashboard on your desktop. Mobile version is on the way.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
