import { ReactNode } from "react"
import { Flex } from "@sipher.dev/sipher-ui"

import { TopNavigationBar } from "../top-navigation-bar"

import MobileUI from "./MobileUI"

interface StoreFrontLayoutProps {
  children: ReactNode
}

export const DetailsLayout = ({ children }: StoreFrontLayoutProps) => {
  return (
    <Flex
      pos="relative"
      overflow="hidden"
      h="100vh"
      w="full"
      direction="column"
      color="whiteAlpha.900"
      bg="neutral.900"
    >
      <Flex display={["none", "none", "flex"]} flexDir="column" flex={1} w="full">
        <TopNavigationBar isSticky />
        <Flex flexDir="column" zIndex={2} overflow="auto" flex={1}>
          {children}
        </Flex>
      </Flex>
      <MobileUI />
    </Flex>
  )
}
