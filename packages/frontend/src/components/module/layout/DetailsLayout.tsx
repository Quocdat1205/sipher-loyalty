import { ReactNode } from "react"
import { Flex } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { OnBoardModal } from "../modal"
import { TopNavigationBar } from "../top-navigation-bar"

interface StoreFrontLayoutProps {
  children: ReactNode
}

export const DetailsLayout = ({ children }: StoreFrontLayoutProps) => {
  const { account } = useWalletContext()

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
      <TopNavigationBar isSticky />
      <Flex flexDir="column" zIndex={2} overflow="auto" flex={1}>
        {account ? children : <OnBoardModal />}
      </Flex>
    </Flex>
  )
}
