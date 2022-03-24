import React, { useState } from "react"
import Image from "next/image"
import { Box, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { SpLayer } from "@components/shared/icons"
import { NftContracts } from "@constant"

import { useNFTs } from "./useNFTs"

interface CardProps {
  data: ReturnType<typeof useNFTs>["nftsData"][number]
}

export const NFTCard = ({ data }: CardProps) => {
  const collectionName = NftContracts.find(property => property.address === data.collectionId)?.name

  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Box
      onClick={data.onView}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Skeleton pos="relative" isLoaded={imageLoaded}>
        <Image
          src={"/images/nft/sipher1.png" || ""}
          alt={data.tokenId}
          loading="lazy"
          height={480}
          width={436}
          onLoad={() => setImageLoaded(true)}
        />
        {data.type === "ERC1155" && (
          <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left="0.5rem">
            <SpLayer />
            <Text fontSize="xs" color="neutral.900" fontWeight={600}>
              {data.value}
            </Text>
          </Flex>
        )}
      </Skeleton>
      <Stack spacing={1} pt={2} pb={4} px={4}>
        <Text fontWeight={600}>{data.type}</Text>
        <Text color="neutral.400">{collectionName}</Text>
      </Stack>
    </Box>
  )
}
