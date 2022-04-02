import React, { useState } from "react"
import { BsClockFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import { Box, Flex, Img, Link, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "@components/shared"

import CountDown from "../CountDown"

import { useClaim } from "./useClaim"

interface CardProps {
  isPopover?: boolean
  data: ReturnType<typeof useClaim>["claimData"][number]
}

const ClaimCard = React.memo(({ data, isPopover }: CardProps) => {
  const { propertyLootbox, expiredDate, quantity } = data
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Flex rounded="lg" align="center" justify="center" pos="relative">
      <Skeleton
        blendMode="lighten"
        sx={{ span: { rounded: "lg" } }}
        overflow="hidden"
        display="flex"
        isLoaded={imageLoaded}
      >
        <Img
          src={"https://sipherstorage.s3.ap-southeast-1.amazonaws.com/loyalty/erc1155/lootbox/Lootbox_1.gif"}
          alt={propertyLootbox?.name}
          loading="lazy"
          objectFit="contain"
          maxH="22rem"
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Stack p={4}>
        <Box mb={2} w="3rem" h="1px" bg="whiteAlpha.200" />
        <Flex flexDir="column" mb={4}>
          <Flex mb={2} align="center">
            <Text textTransform="uppercase" mr={2} fontWeight={600}>
              {propertyLootbox?.name}
            </Text>
            {isPopover && (
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
            )}
          </Flex>
          <Flex color="neutral.400" align="center" fontSize="sm" fontWeight={600}>
            <Box mr={2}>
              <BsClockFill size="0.8rem" />
            </Box>
            <CountDown deadline={expiredDate * 1000} />
          </Flex>
        </Flex>
        <Flex>
          <Text
            backdropFilter="blur(4px)"
            py={1}
            px={4}
            bgGradient={"linear(176.49deg, rgba(51, 205, 239, 0.33) 25.37%, #00748D 147.61%)"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            rounded="md"
            borderBottom="1px"
            borderRight="1px"
            borderColor="whiteAlpha.300"
            fontWeight={600}
            fontSize="sm"
            color="white"
          >
            x{quantity}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  )
})

export default ClaimCard
