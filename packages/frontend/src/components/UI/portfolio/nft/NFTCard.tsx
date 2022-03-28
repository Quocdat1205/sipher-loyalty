import React from "react"
import Image from "next/image"
import { Box, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { SpLayer } from "@components/shared/icons"
import { NftContracts } from "@constant"

import useNFTs from "./useNFTs"

interface CardProps {
  data: ReturnType<typeof useNFTs>["nftsData"][number]
  isFetched: boolean
}

export const images = ["jpg", "gif", "png"]
export const videos = ["mp4", "3gp", "ogg"]

const NFTCard = ({ data, isFetched }: CardProps) => {
  const collectionName = NftContracts.find(
    property => property.address.toUpperCase() === data.collectionId.toUpperCase(),
  )?.name
  const extension = data.imageUrl?.split(".")[5]

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
      <Skeleton
        sx={{ img: { transform: "auto", scale: collectionName === "Sipher Spaceship" ? "1.25" : "1" } }}
        isLoaded={isFetched}
        pos="relative"
      >
        {videos.includes(extension) ? (
          <video src={data.imageUrl} autoPlay loop muted datatype="video/mp4"></video>
        ) : (
          <Image
            src={data.imageUrl || "/images/nft/sipher1.png"}
            alt={data.tokenId}
            loading="lazy"
            height={480}
            width={436}
            quality={100}
            objectFit="contain"
          />
        )}
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
        <Skeleton isLoaded={isFetched}>
          <Text fontWeight={600}>{data.name}</Text>
        </Skeleton>
        <Skeleton isLoaded={isFetched}>
          <Text color="neutral.400">{collectionName}</Text>
        </Skeleton>
      </Stack>
    </Box>
  )
}
export default NFTCard
