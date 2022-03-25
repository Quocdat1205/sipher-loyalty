import { useRef, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { Avatar, Box, Flex, Text, useOutsideClick } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import ForgetPassword from "@components/module/forms/authentication/forget-password"
import SignInForm from "@components/module/forms/authentication/sign-in"
import SignUpForm from "@components/module/forms/authentication/sign-up"
import { SignInProvider } from "@components/module/forms/authentication/useSignInContext"
import { AccountModal, BuySipherModal } from "@components/module/modal"
import { useAuth } from "src/providers/auth"

import UserInfoDropdown from "./UserInfoDropdown"

const SignInButton = () => {
  const wallet = useWalletContext()
  const popRef = useRef<HTMLDivElement>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [modal, setModal] = useState("")

  const { authFlow, setAuthFlow } = useStore(s => ({
    authFlow: s.authFlow,
    setAuthFlow: s.setAuthFlow,
  }))

  const { authenticated, user } = useAuth()

  useOutsideClick({
    ref: popRef,
    handler: () => setIsPopupOpen(false),
  })

  return (
    <SignInProvider>
      <Box minW="6rem" ref={popRef} pos="relative" zIndex={"modal"}>
        <Flex
          bg={!(authenticated && wallet.isActive) ? "accent.500" : "transparent"}
          rounded="md"
          align="center"
          transform={"auto"}
          boxShadow={"base"}
        >
          {!(authenticated && wallet.isActive) ? (
            <Flex
              px={2}
              py={2}
              align="center"
              justify="center"
              w="full"
              cursor="pointer"
              onClick={() => {
                setAuthFlow("SIGN_IN")
              }}
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
            <Flex align="center" cursor="pointer" onClick={() => setIsPopupOpen(!isPopupOpen)}>
              <Avatar bg="gray" size="sm" />
              <Text color="white" display={["none", "block"]} ml={2}>
                {user?.email}
              </Text>
            </Flex>
          )}
        </Flex>
        <UserInfoDropdown
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onBuySipherClick={() => setModal("BUY")}
          onSettingClick={() => setModal("SETTING")}
        />
      </Box>

      <AccountModal isOpen={modal === "SETTING"} onClose={() => setModal("")} />
      <BuySipherModal isOpen={modal === "BUY"} onClose={() => setModal("")} />
      <SignInForm isOpen={authFlow === "SIGN_IN"} onClose={() => setAuthFlow(null)} />
      <SignUpForm isOpen={authFlow === "SIGN_UP"} onClose={() => setAuthFlow(null)} />
      <ForgetPassword isOpen={authFlow === "FORGET_PASSWORD"} onClose={() => setAuthFlow(null)} />
    </SignInProvider>
  )
}

export default SignInButton
