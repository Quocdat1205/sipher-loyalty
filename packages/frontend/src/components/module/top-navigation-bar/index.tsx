import { Box, Flex } from "@sipher.dev/sipher-ui"

import Logo from "./logo"
import NavMenus from "./NavMenus"
import SignInButton from "./sign-in-button"

interface TopNavigationBarProps {
  isSticky?: boolean
}

const menus = [
  { path: "/", label: "DASHBOARD" },
  { path: "/portfolio", label: "PORTFOLIO" },
  { path: "/airdrop", label: "AIRDROPS" },
  { path: "/spaceship", label: "SPACESHIP" },
]

export const TopNavigationBar = ({ isSticky = false }: TopNavigationBarProps) => {
  return (
    <Flex
      bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(51, 52, 74, 0) 100%)"
      w="full"
      justify="space-between"
      backdropFilter="blur(30px)"
      top={0}
      left={0}
      right={0}
      pos={isSticky ? "sticky" : "relative"}
      zIndex="sticky"
    >
      <Flex h="full" pos="relative" overflow={"hidden"}>
        {/* <GradientBox /> */}
        <Box p={2} pt={4} px={[4, 4, 8]} pos="relative">
          <Logo />
        </Box>
      </Flex>
      <Box
        w="50%"
        left={0}
        bottom={0}
        pos="absolute"
        bgGradient={
          "linear(to-r, rgba(255,255,255,0.2),rgba(255,255,255,0.15),rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.025),rgba(255,255,255,0))"
        }
        h="1px"
      />
      <Flex flex={1} justify="center">
        <NavMenus menus={menus} />
      </Flex>
      <Flex justify={"center"} align="center" px={8}>
        <SignInButton />
      </Flex>
    </Flex>
  )
}
