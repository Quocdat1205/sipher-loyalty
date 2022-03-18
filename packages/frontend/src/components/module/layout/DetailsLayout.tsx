import { ReactNode, useEffect, useState } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { useRouter } from "next/router"
import { Box, Button, Flex, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { OnBoardModal } from "../modal"
import { TopNavigationBar } from "../top-navigation-bar"

interface StoreFrontLayoutProps {
  children: ReactNode
}

export const DetailsLayout = ({ children }: StoreFrontLayoutProps) => {
  const { account } = useWalletContext()
  const router = useRouter()
  const [isOnboard, setIsOnboard] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  useEffect(() => {
    if (!account) {
      setIsOnboard(true)
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
      <TopNavigationBar isSticky isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      <Flex flexDir="column" zIndex={2} overflow="auto" flex={1}>
        <Flex zIndex={1} flexDir="column" align="center">
          <Box pt={8} px={8} w="full" maxW="1440px">
            <Button onClick={() => router.back()} pl={2} variant="ghost" alignItems="center">
              <Box color="neutral.500">
                <BiChevronLeft size="1.4rem" />
              </Box>
              <Text color="white">Back</Text>
            </Button>
          </Box>
        </Flex>
        {account ? (
          children
        ) : (
          <OnBoardModal setIsSignUp={setIsSignUp} isOpen={isOnboard} onClose={() => setIsOnboard(false)} />
        )}
      </Flex>
    </Flex>
  )
}
