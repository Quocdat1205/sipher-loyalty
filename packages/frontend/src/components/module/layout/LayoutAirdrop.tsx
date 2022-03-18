import { ReactNode, useEffect, useState } from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { Banner } from "@components/shared"
import { getSignIn } from "@utils"

import { OnBoardModal } from "../modal"
import TabPage from "../TabPage"
import { TopNavigationBar } from "../top-navigation-bar"

interface StoreFrontLayoutProps {
  children: ReactNode
}

const tabs = [
  {
    text: "All",
    path: "/airdrop",
  },
  { text: "NFTs", path: "/airdrop/nfts" },
  { text: "Tokens", path: "/airdrop/tokens" },
  { text: "Merch", path: "/airdrop/merch" },
]

export const LayoutAirdrop = ({ children }: StoreFrontLayoutProps) => {
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
      <TopNavigationBar isSticky isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      <Flex flexDir="column" zIndex={2} overflow="auto" flex={1}>
        {account ? (
          <Flex flexDir="column" align="center" flex={1}>
            <Banner title="Airdrops" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
            <Flex flexDir="column" px={[4, 0]} py={8} flex={1} w="full" maxW="1200px">
              <TabPage tabs={tabs} />
              <Box py={4} flex={1}>
                {children}
              </Box>
            </Flex>
          </Flex>
        ) : (
          <OnBoardModal setIsSignUp={setIsSignUp} isOpen={isOnboard} onClose={() => setIsOnboard(false)} />
        )}
      </Flex>
    </Flex>
  )
}
