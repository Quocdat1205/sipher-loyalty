import React, { useState } from "react"
import Image from "next/image"
import { Box, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon } from "@components/shared"
import { NftContracts } from "@constant"

interface CardProps {
  name: string
  collectionId: string
  price: number
  tokenId: string
  imageUrl: string
  onClick: (collectionId: string, tokenId: string | number) => void
}

export const NFTCard = ({ name, collectionId, price, tokenId, imageUrl, onClick }: CardProps) => {
  const collectionName = NftContracts.find(property => property.address === collectionId)?.name

  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Box
      onClick={() => onClick(collectionId, tokenId)}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Skeleton isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={480}
          width={436}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Stack spacing={1} px={3} py={2}>
        <Flex align="center" justify="space-between">
          <Text fontWeight={600}>{name}</Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text color="neutral.50">{collectionName}</Text>
          <Text background="purple.500" color="white" px={1} pt={0.5} fontSize="sm" rounded="sm" fontWeight={600}>
            #17
          </Text>
        </Flex>
        <Flex align="center">
          <Text mr={2} color="neutral.400">
            Price:
          </Text>
          <EthereumIcon />
          <Text color="neutral.50">{price} ETH</Text>
        </Flex>
      </Stack>
    </Box>
  )
}
