import { useEffect, useRef, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { Avatar, Box, Flex, Text, useOutsideClick } from "@sipher.dev/sipher-ui"
import { AuthType, ConnectWalletAction, SignInAction, useAuthFlowStore } from "@store"
import { useWalletContext } from "@web3"

import ChangeWallet from "@components/module/forms/authentication/change-wallet"
import ConnectToWallet from "@components/module/forms/authentication/connect-wallet"
import ForgetPassword from "@components/module/forms/authentication/forget-password"
import SignInForm from "@components/module/forms/authentication/sign-in"
import SignUpForm from "@components/module/forms/authentication/sign-up"
import { SignInProvider } from "@components/module/forms/authentication/useSignInContext"
import { AccountModal, BuySipherModal } from "@components/module/modal"
import { shortenAddress } from "@utils"
import { useAuth } from "src/providers/auth"

import UserInfoDropdown from "./UserInfoDropdown"

const SignInButton = () => {
  const wallet = useWalletContext()
  const popRef = useRef<HTMLDivElement>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [modal, setModal] = useState("")

  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  const { authenticated, userProfile } = useAuth()

  useOutsideClick({
    ref: popRef,
    handler: () => setIsPopupOpen(false),
  })

  useEffect(() => {
    if (authenticated && !wallet.isActive && flowState === null) {
      setFlowState({ type: AuthType.ConnectWallet, action: ConnectWalletAction.Connect })
    }
  }, [authenticated && !wallet.isActive])

  return (
    <SignInProvider>
      <Box minW="6rem" ref={popRef} pos="relative" zIndex={"modal"}>
        <Flex
          bg={!(authenticated && wallet.isActive && flowState === null) ? "accent.500" : "transparent"}
          rounded="md"
          align="center"
          transform={"auto"}
          boxShadow={"base"}
        >
          {!(authenticated && wallet.isActive && flowState === null) ? (
            <Flex
              px={2}
              py={2}
              align="center"
              justify="center"
              w="full"
              cursor="pointer"
              onClick={() => setFlowState({ type: AuthType.SignIn, action: SignInAction.SignIn })}
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
              <Avatar
                bg="gray"
                size="sm"
                src={userProfile?.user.avatarImage}
                name={userProfile?.user.name}
                bgGradient="linear(to-l, #FCD11F, #DF6767, #200B9F)"
              />
              <Flex direction="column" w="8rem" ml={2}>
                <Text color="white" display={["none", "block"]} isTruncated>
                  {userProfile?.user.name}
                </Text>
                <Text w="full" isTruncated fontSize="sm">
                  {shortenAddress(wallet.account)}
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
        <UserInfoDropdown
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onBuySipherClick={() => {
            setModal("BUY")
            setIsPopupOpen(false)
          }}
          onSettingClick={() => {
            setModal("SETTING")
            setIsPopupOpen(false)
          }}
        />
      </Box>

      <AccountModal isOpen={modal === "SETTING"} onClose={() => setModal("")} />
      <BuySipherModal isOpen={modal === "BUY"} onClose={() => setModal("")} />
      <SignInForm />
      <SignUpForm />
      <ForgetPassword />
      <ConnectToWallet />
      <ChangeWallet />
    </SignInProvider>
  )
}

export default SignInButton
