import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Img, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { SpLayer } from "@components/shared/icons"

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
      cursor="pointer"
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
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
          bg="white"
          h="14rem"
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
            objectFit="contain"
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
            objectFit="contain"
            w="full"
            h="full"
          />
          <Flex
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            align="center"
            py={0.5}
            px={1.5}
            rounded="full"
            bg="white"
            pos="absolute"
            bottom="1rem"
            left="0.5rem"
          >
            <SpLayer />
            <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
              {data?.quantity}
            </Text>
          </Flex>
        </Skeleton>
      ) : (
        <Skeleton
          display="flex"
          alignItems="center"
          justifyContent="center"
          pos="relative"
          overflow="hidden"
          h="14rem"
          w="full"
          isLoaded={isFetched && data.imageUrls?.length > 0}
        >
          {videos.includes(extension) ? (
            <video src={data.imageUrls[0]?.default} autoPlay loop muted datatype="video/mp4"></video>
          ) : (
            <Image
              src={(data.imageUrls?.length > 0 && data.imageUrls[0].default) || "/images/airdrops/sipher.png"}
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
              {data.shortDescription}
            </Text>
          </Skeleton>
        </Box>
        <Skeleton isLoaded={isFetched}>
          <Button
            textTransform="uppercase"
            onClick={data.onClaim}
            isLoading={data.isClaiming}
            isDisabled={data.isDisabled}
            w="full"
          >
            {data.buttonText}
          </Button>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default AirdropCard
