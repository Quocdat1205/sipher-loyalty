import React, { useState } from "react"
import { BsClockFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import Image from "next/image"
import { Box, Button, Divider, Flex, Link, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "@components/shared"

interface CardProps {
  name: string
  imageUrl: string
  isActive: boolean
}

export const ClaimCard = React.memo(({ isActive, name, imageUrl }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Flex
      rounded="lg"
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      align="center"
      justify="center"
      flexDir="column"
      pos="relative"
    >
      <Skeleton overflow="hidden" display="flex" isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={250}
          width={250}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Box p={6}>
        <Divider mb={4} borderColor="whiteAlpha.200" />
        <Flex flexDir="column" align="center" mb={4} textAlign="center">
          <Flex mb={2} align="center">
            <Text mr={2} fontWeight={600}>
              LOOT BOX
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
                Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms. For
                more infomation about wallets, see this{" "}
                <Link
                  isExternal
                  href="https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/"
                  color="cyan.500"
                  textDecor="underline"
                >
                  explanation
                </Link>
              </Text>
            </CustomPopover>
          </Flex>
          <Flex align="center">
            <Box mr={2} color="neutral.400">
              <BsClockFill />
            </Box>
            <Text>06D : 23H : 35M</Text>
          </Flex>
        </Flex>
        <Flex transition="0.25s opacity ease-in-out" opacity={isActive ? 1 : 0} align="center">
          <Button>ClAIM LOOTBOX</Button>
          <Button ml={4}>CLAIM ALL LOOTBOXES(10)</Button>
        </Flex>
      </Box>
      <Flex
        align="center"
        justify="center"
        bg="whiteAlpha.800"
        boxSize="3.5rem"
        rounded="full"
        pos="absolute"
        top={4}
        right={4}
      >
        <Text fontSize="lg" fontWeight={600} color="neutral.900">
          x5
        </Text>
      </Flex>
    </Flex>
  )
})
