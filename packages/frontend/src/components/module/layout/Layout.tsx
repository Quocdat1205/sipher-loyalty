import { ReactNode, useEffect, useState } from "react"
import { Flex } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { getSignIn } from "@utils"

import { OnBoardModal } from "../modal"
import { TopNavigationBar } from "../top-navigation-bar"

interface StoreFrontLayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: StoreFrontLayoutProps) => {
  const { account } = useWalletContext()
  const [isOnboard, setIsOnboard] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    if (!getSignIn()) {
      setIsOnboard(true)
    }
  }, [])

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
      <Flex flexDir="column" zIndex={2} overflow="auto" flex={1} w="full">
        {account ? (
          children
        ) : (
          <OnBoardModal setIsSignUp={setIsSignUp} isOpen={isOnboard} onClose={() => setIsOnboard(false)} />
        )}
      </Flex>
    </Flex>
  )
}
