import React from "react"
import { BiChevronRight } from "react-icons/bi"
import { Box, Button, Flex, Img, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { SpLayer } from "@components/shared/icons"
import { NftContracts } from "@constant"

import useNFTs from "./useNFTs"

interface CardProps {
  data: ReturnType<typeof useNFTs>["nftsData"][number]
  isFetched: boolean
  gridSize: string
}

export const images = ["jpg", "gif", "png"]
export const videos = ["mp4", "3gp", "ogg"]

const NFTCard = ({ data, isFetched, gridSize }: CardProps) => {
  const collectionName = NftContracts.find(
    property => property.address.toUpperCase() === data?.collectionId.toUpperCase(),
  )?.name
  const extension = data?.imageUrl?.split(".")[5]

  return (
    <Box
      onClick={() => data.onSelect(!data.isChecked)}
      _hover={{
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
      overflow="hidden"
      rounded="lg"
      role="group"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Skeleton
        sx={{ video: { minH: gridSize === "small" ? "12rem" : "18rem" } }}
        bg="black"
        isLoaded={isFetched}
        pos="relative"
        w="full"
      >
        {data?.type === "ERC1155" && collectionName === "Sipher Lootbox" && (
          <Flex
            justify={data?.type === "ERC1155" ? "space-between" : "flex-end"}
            align="center"
            px={4}
            _groupHover={{ opacity: 1 }}
            transition=".35s opacity"
            pos="absolute"
            w="full"
            left={0}
            right={0}
            top={3}
            zIndex={1}
            opacity={data.isChecked ? 1 : 0}
          >
            <CustomCheckbox onChange={e => data.onSelect(!e.target.checked)} isChecked={data.isChecked} />
            <Button
              onClick={e => {
                e.stopPropagation()
                data.onView()
              }}
              size="sm"
              rounded="full"
              bg="white"
              pr={1}
            >
              <Flex align="center">
                <Text fontSize="sm">{"View"}</Text>
                <Box>
                  <BiChevronRight size="1.2rem" />
                </Box>
              </Flex>
            </Button>
          </Flex>
        )}
        <Box _groupHover={{ opacity: collectionName === "Sipher Lootbox" ? 0.6 : 1 }}>
          {videos.includes(extension) ? (
            <video src={data.imageUrl} autoPlay loop muted datatype="video/mp4"></video>
          ) : (
            <Img
              minH={gridSize === "small" ? "12rem" : "18rem"}
              w="full"
              src={data.imageUrl ?? "https://via.placeholder.com/150"}
              alt={data.tokenId}
              loading="lazy"
              objectFit="contain"
            />
          )}
        </Box>
        {data.type === "ERC1155" && (
          <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left={4}>
            <SpLayer />
            <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
              {data.value}
            </Text>
          </Flex>
        )}
      </Skeleton>
      <Stack spacing={1} p={4}>
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
