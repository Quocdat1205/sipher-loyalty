import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Heading, HStack, Text } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"

import { ChakraModal } from "@components/shared"

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
  setIsSignUp: (isSignUp: boolean) => void
}

// const slideData = [<Slide1 />, <Slide2 />, <Slide1 />]

const imageData = [
  {
    image: "/images/general/onboard1.png",
    title1: "Ather Labs - Gaming Entertainment",
    title2: "Studio Utilizing Blockchain",
  },
  {
    image: "/images/general/onboard2.png",
    title1: "ACCESS To ather labs' platforms &",
    title2: "games with one ather account",
  },
  {
    image: "/images/general/onboard3.png",
    title1: "enjoy extra benefits &",
    title2: "exclusive rewards",
  },
]

export const OnBoardModal = ({ isOpen, onClose, setIsSignUp }: SettingAccountModalProps) => {
  const { toggleWalletModal } = useStore(s => ({
    toggleWalletModal: s.toggleWalletModal,
  }))

  const handleClick = () => {
    toggleWalletModal(true)
    setIsSignUp(true)
    onClose()
  }

  return (
    <ChakraModal
      isHiddenClose
      closeOnOverlayClick={false}
      isCentered
      title={""}
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      styleProps={{
        bg: "rgba(97, 97, 97, 0.1)",
        border: "1px",
        borderColor: "whiteAlpha.200",
        rounded: "2xl",
      }}
    >
      <Box opacity="0.5" pos="absolute" w="full" h="full" top="0" left="0" bg="url(/images/general/noise.png)" />
      <Flex px={6} w="full" flexDir="column" align="center">
        <Flex mb={10} align="center">
          <Heading mr={4} fontWeight={600} fontSize="3xl">
            WELCOME TO
          </Heading>
          <Image src="/images/general/LOGO.svg" width={274} height={47} alt="LOGO" />
        </Flex>
        <HStack mb={8} w="full" justify="space-between" spacing={6}>
          {imageData.map(item => (
            <Box sx={{ img: { rounded: "lg" } }} w="full" h="full" key={item.title1}>
              <Image src={item.image} alt={item.title1} width={320} height={416} />
              <Text mt={4} textAlign="center" textTransform="uppercase" fontSize="sm" fontWeight={600}>
                {item.title1}
              </Text>
              <Text textAlign="center" textTransform="uppercase" fontSize="sm" fontWeight={600}>
                {item.title2}
              </Text>
            </Box>
          ))}
        </HStack>
        <Box textAlign="center" w="full">
          <Button onClick={handleClick} letterSpacing="1px" fontSize="md" w="14rem" size="lg">
            GET STARTED
          </Button>
        </Box>
      </Flex>
      {/* <Flex mb={4} align="center" justify="center">
        <StepComponent slideData={slideData} page={page} direction={direction} index={index} handleClick={handleClick}>
          {index === 0 ? (
            <Fragment>
              <Text fontSize="lg" fontWeight={00} textAlign="center">
                Ather Labs - Gaming Entertainment
              </Text>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Studio Utilizing Blockchain
              </Text>
            </Fragment>
          ) : index === 1 ? (
            <Fragment>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Access to Ather Labs' Platforms &
              </Text>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Games with one Ather Account
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Enjoy extra Benefits &
              </Text>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Earn exclusive Rewards
              </Text>
            </Fragment>
          )}
        </StepComponent>
      </Flex>
      <Box h="3rem">
        {index === slideData.length - 1 ? (
          <Box textAlign="center" w="full">
            <Button onClick={onClose} letterSpacing="1px" fontSize="md" w="12rem" py={6}>
              GET STARTED
            </Button>
          </Box>
        ) : (
          <HStack py={4} justify="space-between">
            <Button onClick={onClose} variant="ghost" color="accent.500" fontSize="md">
              SKIP
            </Button>
            <Button onClick={() => paginate(1)} variant="ghost" color="neutral.200" fontSize="md">
              NEXT
            </Button>
          </HStack>
        )}
      </Box> */}
    </ChakraModal>
  )
}
