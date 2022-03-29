import { ReactNode } from "react"
import { Flex } from "@sipher.dev/sipher-ui"

import { OnBoardModal } from "../modal"
import { TopNavigationBar } from "../top-navigation-bar"

export const CommonLayout = ({ children }: { children: ReactNode }) => {
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
      <Flex flexDir="column" flex={1} w="full" overflow="auto">
        <TopNavigationBar isSticky />
        <Flex flexDir="column" zIndex={2} flex={1}>
          {children}
          <OnBoardModal />
        </Flex>
      </Flex>
    </Flex>
  )
}
