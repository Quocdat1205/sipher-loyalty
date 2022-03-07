import { ReactNode } from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { TopNavigationBar } from "../top-navigation-bar"
import { ConnectWalletUI } from "../top-navigation-bar/user-info"

import { GradientBox } from "."

interface StoreFrontLayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: StoreFrontLayoutProps) => {
  const { account } = useWalletContext()

  return (
    <Flex
      pos="relative"
      minH="100vh"
      w="full"
      direction="column"
      overflow="hidden"
      color="whiteAlpha.900"
      bg="neutral.900"
    >
      <GradientBox />
      <TopNavigationBar />
      <Flex flexDir="column" zIndex={2} overflow={"hidden"} flex={1}>
        {account ? (
          children
        ) : (
          <Flex flex={1} pt={16} w="full" justify="center">
            <Box w="full" maxW="36rem">
              <ConnectWalletUI />
            </Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
