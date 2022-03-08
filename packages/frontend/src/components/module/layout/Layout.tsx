import { ReactNode, useEffect, useState } from "react"
import { Flex } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { OnBoardModal } from "../modal"
import { TopNavigationBar } from "../top-navigation-bar"

import { GradientBox } from "."

interface StoreFrontLayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: StoreFrontLayoutProps) => {
  const { account } = useWalletContext()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!account) {
      setModal(true)
    }
  }, [account])

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
      <GradientBox />
      <TopNavigationBar isSticky />
      <Flex flexDir="column" zIndex={2} overflow="auto" flex={1}>
        {account ? children : <OnBoardModal isOpen={modal} onClose={() => setModal(false)} />}
      </Flex>
    </Flex>
  )
}
