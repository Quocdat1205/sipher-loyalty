import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Img, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { videos } from "../portfolio/nft/NFTCard"

import { useAirdrops } from "./useAirdrops"

interface AirdropProps {
  data: ReturnType<typeof useAirdrops>["allAirdrops"][number]
  isFetched: boolean
}

const AirdropCard = ({ data, isFetched }: AirdropProps) => {
  const extension = data.imageUrls[0]?.default.split(".")[5]

  return (
    <Flex
      flexDir="column"
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      bg="neutral.700"
      rounded="lg"
      overflow="hidden"
      onClick={data.onView}
    >
      {data.type === "MERCH" ? (
        <Skeleton
          display="flex"
          role="group"
          alignItems="center"
          justifyContent="center"
          pos="relative"
          w="full"
          overflow="hidden"
          h="12rem"
          sx={{
            img: {
              pos: "absolute",
              left: 0,
              transition: "opacity 0.7s ease-in-out",
            },
          }}
          isLoaded={isFetched && data.imageUrls?.length > 0}
        >
          <Img
            src={
              data?.imageUrls.length > 0
                ? data?.imageUrls?.find(item => item.color === "black")?.back || data.imageUrls[0].default
                : ""
            }
            objectFit="cover"
            w="full"
            h="full"
          />
          <Img
            _groupHover={{
              opacity: 0,
            }}
            src={
              data?.imageUrls.length > 0
                ? data?.imageUrls?.find(item => item.color === "black")?.front || data.imageUrls[0].front
                : ""
            }
            objectFit="cover"
            w="full"
            h="full"
          />
        </Skeleton>
      ) : (
        <Skeleton
          display="flex"
          alignItems="center"
          justifyContent="center"
          pos="relative"
          overflow="hidden"
          h="12rem"
          w="full"
          isLoaded={isFetched && data.imageUrls?.length > 0}
        >
          {videos.includes(extension) ? (
            <video src={data.imageUrls[0]?.default} autoPlay loop muted datatype="video/mp4"></video>
          ) : (
            <Image
              src={(data.imageUrls?.length > 0 && data.imageUrls[0].default) || "/image/airdrops/sipher1.png"}
              objectFit="contain"
              quality={100}
              width={212 * 1.5}
              height={188 * 1.5}
            />
          )}
        </Skeleton>
      )}
      <Flex flexDir="column" flex={1} p={4}>
        <Box flex={1}>
          <Skeleton mb={1} isLoaded={isFetched}>
            <Text fontWeight={600}>{data.name}</Text>
          </Skeleton>
          <Skeleton isLoaded={isFetched}>
            <Text mb={2} fontSize="xs" color="neutral.300">
              {data.description}
            </Text>
          </Skeleton>
        </Box>
        <Skeleton isLoaded={isFetched}>
          <Button onClick={data.onClaim} isLoading={data.isClaiming} isDisabled={data.isDisabled} w="full">
            CLAIM
          </Button>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default AirdropCard
