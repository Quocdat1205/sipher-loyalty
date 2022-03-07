import { useEffect, useRef, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { Avatar, Box, Flex, Text, useOutsideClick } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { shortenAddress } from "@utils"

import { ConnectWalletModal, UserInfoDropdown } from "."

interface ConnectWalletButtonProps {
  setOpenSetting?: (value: boolean) => void
}

export const ConnectWalletButton = ({ setOpenSetting }: ConnectWalletButtonProps) => {
  const wallet = useWalletContext()
  const boxRef = useRef<HTMLDivElement>(null)
  const [walletModal, setWalletModal] = useState(false)
  const [infoPopup, setInfoPopup] = useState(false)

  useOutsideClick({
    ref: boxRef,
    handler: () => setInfoPopup(false),
  })

  useEffect(() => {
    if (wallet.isActive) setWalletModal(false)
  }, [wallet.isActive])

  return (
    <>
      <Box ref={boxRef} pos="relative" zIndex={"modal"}>
        <Flex
          bg={
            !wallet.isActive
              ? "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 52.63%, rgba(255, 255, 255, 0) 52.64%), linear-gradient(276.29deg, #FCD11F -4.75%, #DF6767 30.04%, #200B9F 101.81%)"
              : "transparent"
          }
          rounded="md"
          align="center"
          transform={"auto"}
          skewX={"-5deg"}
          boxShadow={"base"}
          w={["2rem", "10rem"]}
        >
          {!wallet.isActive ? (
            <Flex
              px={2}
              py={2}
              align="center"
              justify="center"
              w="full"
              cursor="pointer"
              onClick={() => setWalletModal(true)}
              transform={"auto"}
              skewX={"5deg"}
            >
              <Text display={["none", "block"]} fontWeight={600} mr={2}>
                Link wallet
              </Text>
              <Box>
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
      <ConnectWalletModal isOpen={walletModal} onClose={() => setWalletModal(false)} />
    </>
  )
}
