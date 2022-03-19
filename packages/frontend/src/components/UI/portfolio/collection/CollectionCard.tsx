import React, { useState } from "react"
import Image from "next/image"
import { Avatar, Box, Flex, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon } from "@components/shared"
import { SpLayer, SpVerified } from "@components/shared/icons"
import { currency } from "@utils"

interface CardProps {
  collectionName: string
  collectionId: string
  isVerified: boolean
  imageUrl: string
  volume: number
  floorPrice: number
  onClick: (id: number | string) => void
}

export const CollectionCard = ({
  collectionName,
  collectionId,
  isVerified = false,
  imageUrl,
  volume,
  floorPrice,
  onClick,
}: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Box
      onClick={() => onClick(collectionId)}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Skeleton pos="relative" display="flex" isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={collectionName}
          loading="lazy"
          height={170}
          width={383}
          onLoad={() => setImageLoaded(true)}
        />
        <Flex align="center" py={0.5} px={2} rounded="full" bg="white" pos="absolute" bottom="0.5rem" left="0.5rem">
          <SpLayer />
          <Text ml={1} color="neutral.900" fontWeight={600}>
            25
          </Text>
        </Flex>
      </Skeleton>
      <Flex p={4} align="center">
        <Avatar size="lg" src={imageUrl || ""} />
        <Box flex={1} ml={6}>
          <Flex mb={2} align="center">
            <Text fontWeight={600} mr={1} fontSize="lg">
              {collectionName}
            </Text>
            <Box pt="2px">{isVerified && <SpVerified />}</Box>
          </Flex>
          <Flex align="center">
            <Box>
              <Text fontWeight={600} color="neutral.400">
                Volume
              </Text>
              <Flex align="center">
                <EthereumIcon />
                <Text color="neutral.50">
                  {volume} {""}M
                </Text>
              </Flex>
            </Box>
            <Box ml={8}>
              <Text fontWeight={600} color="neutral.400">
                Floor Price
              </Text>
              <Flex align="center">
                <EthereumIcon />
                <Text color="neutral.50">{currency(floorPrice)} </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
