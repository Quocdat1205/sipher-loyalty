import { Fragment, useEffect, useRef, useState } from "react"
import { Avatar, Box, Flex, Text, useOutsideClick } from "@sipher.dev/sipher-ui"
import { useAuthFlowStore } from "@store"
import useWeb3Wallet from "@web3-wallet"

import ChangeWallet from "@components/module/forms/authentication/change-wallet"
import ConnectToWallet from "@components/module/forms/authentication/connect-wallet"
import ForgotPassword from "@components/module/forms/authentication/forgot-password"
import { AccountModal, BuySipherModal } from "@components/module/modal"
import { shortenAddress } from "@utils"
import { useAuth } from "src/providers/auth"

import UserInfoDropdown from "./UserInfoDropdown"

const SignInButton = () => {
  const wallet = useWeb3Wallet()
  const popRef = useRef<HTMLDivElement>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [modal, setModal] = useState("")

  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  const { authenticated, userProfile, refetchOwnedWallets } = useAuth()

  useOutsideClick({
    ref: popRef,
    handler: () => setIsPopupOpen(false),
  })

  useEffect(() => {
    const checkConnection = async () => {
      if (authenticated) {
        const ownedWallets = await refetchOwnedWallets()
          .then(res => res.data)
          .then(data => data?.map(wallet => wallet.address))
        if (flowState === null && (!wallet.isActive || (!!ownedWallets && !ownedWallets.includes(wallet.account!)))) {
          setFlowState("connectWallet")
        } else if (flowState === "connectWallet") setFlowState(null)
      }
    }
    checkConnection()
  }, [authenticated, wallet.isActive])

  return (
    <Fragment>
      {authenticated && (
        <Box minW="6rem" ref={popRef} pos="relative" zIndex={"modal"}>
          <Flex bg={"transparent"} rounded="md" align="center" transform={"auto"}>
            <Flex align="center" cursor="pointer" onClick={() => setIsPopupOpen(!isPopupOpen)}>
              <Avatar
                bg="gray"
                size="sm"
                src={userProfile?.user.avatarImage}
                name={userProfile?.user.name}
                bgGradient="linear(to-l, #FCD11F, #DF6767, #200B9F)"
              />
              <Flex direction="column" maxW="10rem" ml={2}>
                <Text color="white" display={["none", "block"]} isTruncated>
                  {userProfile?.user.name}
                </Text>
                <Text w="full" isTruncated fontSize="sm" color="neutral.300">
                  {flowState === "connectWallet"
                    ? "Connecting wallet"
                    : wallet.isActive
                    ? shortenAddress(wallet.account!)
                    : "Wallet not connected"}
                </Text>
              </Flex>
            </Flex>
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
      )}

      <AccountModal isOpen={modal === "SETTING"} onClose={() => setModal("")} />
      <BuySipherModal isOpen={modal === "BUY"} onClose={() => setModal("")} />
      <ConnectToWallet />
      <ChangeWallet />
      <ForgotPassword />
    </Fragment>
  )
}

export default SignInButton
