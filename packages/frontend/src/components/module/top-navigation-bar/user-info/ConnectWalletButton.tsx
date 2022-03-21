import { useRef, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { Avatar, Box, Flex, Text, useOutsideClick } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import SignInForm from "@components/module/forms/authentication/sign-in"
import SignUpForm from "@components/module/forms/authentication/sign-up"
import { SignInProvider } from "@components/module/forms/authentication/useSignInContext"
import { shortenAddress } from "@utils"
import { useAuth } from "src/providers/auth"

import { UserInfoDropdown } from "."

export const ConnectWalletButton = () => {
  const wallet = useWalletContext()
  const popRef = useRef<HTMLDivElement>(null)
  const [infoPopup, setInfoPopup] = useState(false)

  const { authFlow, setAuthFlow } = useStore(s => ({
    authFlow: s.authFlow,
    setAuthFlow: s.setAuthFlow,
  }))

  const { authenticated } = useAuth()

  useOutsideClick({
    ref: popRef,
    handler: () => setInfoPopup(false),
  })

  return (
    <SignInProvider>
      <Box>
        <Box minW="6rem" ref={popRef} pos="relative" zIndex={"modal"}>
          <Flex
            bg={!wallet.isActive ? "accent.500" : "transparent"}
            rounded="md"
            align="center"
            transform={"auto"}
            boxShadow={"base"}
          >
            {!wallet.isActive ? (
              <Flex
                px={2}
                py={2}
                align="center"
                justify="center"
                w="full"
                cursor="pointer"
                onClick={() => setAuthFlow("SIGN_IN")}
                transform={"auto"}
              >
                <Text color="neutral.900" display={["none", "block"]} fontWeight={600}>
                  SIGN IN
                </Text>
                <Box ml={2} display={["block", "none"]}>
                  <FaWallet />
                </Box>
              </Flex>
            ) : (
              <Flex
                transform={"auto"}
                skewX={"5deg"}
                align="center"
                cursor="pointer"
                onClick={() => setInfoPopup(!infoPopup)}
              >
                <Avatar bg="gray" size="sm" />
                <Text color="white" display={["none", "block"]} ml={2}>
                  {shortenAddress(wallet.account)}
                </Text>
              </Flex>
            )}
          </Flex>
          {infoPopup && <UserInfoDropdown isOpen={infoPopup} onClose={() => setInfoPopup(false)} />}
        </Box>
        <SignInForm isOpen={authFlow === "SIGN_IN"} onClose={() => setAuthFlow(null)} />
        <SignUpForm isOpen={authFlow === "SIGN_UP"} onClose={() => setAuthFlow(null)} />
      </Box>
    </SignInProvider>
  )
}
