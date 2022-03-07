import { Fragment, ReactNode, useEffect, useState } from "react"
import { Flex } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
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
  const { toggleWalletModal } = useStore(s => ({
    toggleWalletModal: s.toggleWalletModal,
  }))

  useEffect(() => {
    if (!account) {
      toggleWalletModal(true)
    } else {
      setModal(true)
    }
  }, [account])

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
          <Fragment>
            {children}
            <OnBoardModal isOpen={modal} onClose={() => setModal(false)} />
          </Fragment>
        ) : null}
      </Flex>
    </Flex>
  )
}
