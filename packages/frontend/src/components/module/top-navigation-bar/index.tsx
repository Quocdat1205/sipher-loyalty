import { Box, Flex } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"

import SignInForm from "../forms/authentication/sign-in"
import SignUpForm from "../forms/authentication/sign-up"
import { GradientBox } from "../layout"

import Logo from "./logo"
import NavMenus from "./NavMenus"
import SignInButton from "./sign-in-button"

interface TopNavigationBarProps {
  isSticky?: boolean
}

const menus = [
  { path: "/", label: "DASHBOARD" },
  { path: "/portfolio", label: "PORTFOLIO" },
  { path: "/airdrop", label: "AIRDROP" },
  { path: "/spaceship", label: "SPACESHIP" },
]

export const TopNavigationBar = ({ isSticky = false }: TopNavigationBarProps) => {
  return (
    <Flex
      bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(51, 52, 74, 0) 100%)"
      w="full"
      justify="space-between"
      align="center"
      backdropFilter="blur(10px)"
      top={0}
      left={0}
      right={0}
      pos={isSticky ? "sticky" : "relative"}
      zIndex="sticky"
    >
      <Flex flex={1} pos="relative" overflow={"hidden"}>
        {/* <GradientBox /> */}
        <Box p={2} pt={4} px={[4, 4, 8]} pos="relative">
          <Logo />
          <Box
            w="200%"
            left={0}
            bottom={0}
            pos="absolute"
            bgGradient={"linear(to-r, rgba(255,255,255,0.5), transparent)"}
            h="1px"
          />
        </Box>
      </Flex>
      <Flex justify="center" align="center">
        <NavMenus menus={menus} />
      </Flex>
      <Flex justify={"flex-end"} px={8} flex={1}>
        <SignInButton />
      </Flex>
    </Flex>
  )
}
