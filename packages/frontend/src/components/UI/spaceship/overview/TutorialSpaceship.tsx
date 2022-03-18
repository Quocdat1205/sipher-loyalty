import React from "react"
import { BiChevronRight } from "react-icons/bi"
import { MdInfo } from "react-icons/md"
import Image from "next/image"
import { Box, chakra, Flex, Heading, HStack, Text } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "@components/shared"

export const TutorialSpaceship = () => {
  return (
    <Flex pt={16} pos="relative" flexDir="column" align="center" w="full">
      <Flex
        bgGradient="linear(180deg, #292A40 0%, rgba(41, 42, 64, 0) 100%)"
        flexDir="column"
        transform="auto"
        skewX="-10deg"
        justify="center"
        zIndex={2}
        rounded="lg"
        maxW="1200px"
        w="full"
      >
        <Flex px={12} pt={8} pb={16} align="center" transform="auto" skewX="10deg">
          <Box flex={2}>
            <Heading mb={4} fontWeight={600} fontSize="3xl">
              Spaceship Tutorial
            </Heading>
            <Text color="neutral.100">
              You can mint LootBoxes to NFTs on Polygon for trading on secondary Marketplaces or just open the box to
              get the random ship parts and build up a Spaceship for using in Sipher game.
            </Text>
          </Box>
          <HStack pl={16} justify="space-between" align="center" flex={3}>
            <Box textAlign="center">
              <Flex justify="center" mb={2} align="center">
                <Text fontWeight={600} mr={2}>
                  Loot Box
                </Text>
                <CustomPopover
                  placement="top"
                  label="Crypto-wallet"
                  icon={
                    <Box color="neutral.500">
                      <MdInfo size="1.2rem" />
                    </Box>
                  }
                >
                  <Text fontSize="sm" color="neutral.900">
                    Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms.
                    For more infomation about wallets, see this{" "}
                    <chakra.span color="cyan.500" textDecor="underline">
                      explanation
                    </chakra.span>
                  </Text>
                </CustomPopover>
              </Flex>
              <Image src="/images/spaceship/tutorial1.png" width={114} height={114} alt="tutorial1" />
            </Box>
            <Box pos="relative">
              <Box bg="neutral.600" rounded="full" p={2} color="neutral.200">
                <BiChevronRight size="1.6rem" />
              </Box>
              <Box
                zIndex={-1}
                h="8rem"
                w="1px"
                bgGradient="linear(180deg,rgba(69, 70, 94, 0) 0%, #45465E 25%, rgba(69, 70, 94, 0) 50%, #45465E 75%, rgba(69, 70, 94, 0) 100%)"
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%,-50%)"
              />
            </Box>
            <Box textAlign="center">
              <Text mb={2} fontWeight={600}>
                Ship Parts
              </Text>
              <Image src="/images/spaceship/tutorial2.png" width={114} height={114} alt="tutorial2" />
            </Box>
            <Box pos="relative">
              <Box bg="neutral.600" rounded="full" p={2} color="neutral.200">
                <BiChevronRight size="1.6rem" />
              </Box>
              <Box
                zIndex={-1}
                h="8rem"
                w="1px"
                bgGradient="linear(180deg,rgba(69, 70, 94, 0) 0%, #45465E 25%, rgba(69, 70, 94, 0) 50%, #45465E 75%, rgba(69, 70, 94, 0) 100%)"
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%,-50%)"
              />
            </Box>
            <Box textAlign="center">
              <Text mb={2} fontWeight={600}>
                Spaceship
              </Text>
              <Image src="/images/spaceship/tutorial3.png" width={114} height={114} alt="tutorial3" />
            </Box>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}
