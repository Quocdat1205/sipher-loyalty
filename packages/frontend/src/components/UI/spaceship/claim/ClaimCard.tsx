import React, { useState } from "react"
import { BsClockFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import Image from "next/image"
import { Box, Divider, Flex, Link, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "@components/shared"

import CountDown from "../CountDown"

interface CardProps {
  name: string
  imageUrl: string
  expiredDate: number
  isActive?: boolean
  quantity: number
}

export const ClaimCard = React.memo(({ name, imageUrl, expiredDate, quantity }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Flex rounded="lg" align="center" justify="center" flexDir="column" pos="relative">
      <Skeleton overflow="hidden" display="flex" isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={280}
          width={280}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Box p={4} w="full">
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
            <CountDown deadline={expiredDate} />
          </Flex>
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
          x{quantity}
        </Text>
      </Flex>
    </Flex>
  )
})
