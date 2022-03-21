import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Heading, HStack, Text } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"

import { ChakraModal } from "@components/shared"
import { setSignIn } from "@utils"

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

export const OnBoardModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const { setAuthFlow } = useStore(s => ({
    setAuthFlow: s.setAuthFlow,
  }))

  const handleClick = () => {
    setAuthFlow("SIGN_IN")
    onClose()
  }

  return (
    <ChakraModal
      title={""}
      isOpen={isOpen}
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
    </ChakraModal>
  )
}
