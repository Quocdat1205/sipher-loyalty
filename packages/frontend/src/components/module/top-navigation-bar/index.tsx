import { useState } from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import { SettingAccountModal } from "../modal"

import Logo from "./Logo"
import NavMenus from "./NavMenus"
import { ConnectWalletButton } from "./user-info"

interface TopNavigationBarProps {
  isSticky?: boolean
}

const menus = [
  { path: "/", label: "DASHBOARD" },
  { path: "/spaceship", label: "SPACESHIP" },
  { path: "/portfolio", label: "PORTFOLIO" },
  { path: "/airdrop", label: "AIRDROP" },
  // { path: "/quest", label: "QUEST" },
  // { path: "/rewards", label: "REWARD" },
]

export const TopNavigationBar = ({ isSticky = false }: TopNavigationBarProps) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false)

  return (
    <Box backdropFilter="blur(10px)" pos={isSticky ? "sticky" : "unset"} top={0} left={0} right={0} zIndex="sticky">
      <Flex
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(51, 52, 74, 0) 100%)"
        w="full"
        justify="space-between"
        align="center"
        pos="relative"
      >
        <Flex pos="relative" flex={1} mr={8}>
          <Box p={2} pt={4} px={[4, 4, 8]} pos="relative">
            <Logo />
            <Box
              w="200%"
              left={0}
              bottom={0}
              pos="absolute"
              bgGradient={"linear(to-r, rgba(255,255,255,0.5), transparent)"}
            />
          </Box>
          <Flex flex={1} justify="center" align="center">
            <NavMenus menus={menus} />
          </Flex>
        </Flex>
        <Box mr={4} ml={8}>
          <ConnectWalletButton setOpenSetting={setOpenSetting} />
        </Box>
      </Flex>
      <SettingAccountModal isOpen={openSetting} onClose={() => setOpenSetting(false)} />
    </Box>
  )
}
