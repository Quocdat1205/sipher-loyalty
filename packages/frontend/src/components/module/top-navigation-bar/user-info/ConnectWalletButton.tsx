import { useEffect, useRef, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { Avatar, Box, Flex, Text, useOutsideClick } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { shortenAddress } from "@utils"

import { ConnectWalletModal, UserInfoDropdown } from "."

interface ConnectWalletButtonProps {
  setOpenSetting?: (value: boolean) => void
}

export const ConnectWalletButton = ({ setOpenSetting }: ConnectWalletButtonProps) => {
  const wallet = useWalletContext()
  const popRef = useRef<HTMLDivElement>(null)
  const [infoPopup, setInfoPopup] = useState(false)

  const { isWalletModalOpen, toggleWalletModal } = useStore(s => ({
    isWalletModalOpen: s.isWalletModalOpen,
    toggleWalletModal: s.toggleWalletModal,
  }))

  useOutsideClick({
    ref: popRef,
    handler: () => setInfoPopup(false),
  })

  useEffect(() => {
    if (wallet.isActive) toggleWalletModal(false)
  }, [wallet.isActive])

  return (
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
              onClick={() => toggleWalletModal(true)}
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
        <Box
          pos="absolute"
          transform={"auto"}
          top={"100%"}
          right={0}
          translateY={"0.5rem"}
          zIndex={"modal"}
          overflow="auto"
          maxH={["35rem", "unset"]}
        >
          {infoPopup && (
            <UserInfoDropdown isOpen={infoPopup} onClose={() => setInfoPopup(false)} setOpenSetting={setOpenSetting} />
          )}
        </Box>
      </Box>
      <ConnectWalletModal isOpen={isWalletModalOpen} onClose={() => toggleWalletModal(false)} />
    </Box>
  )
}
