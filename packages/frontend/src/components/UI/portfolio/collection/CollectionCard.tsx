import React, { useState } from "react"
import { Avatar, Box, BoxProps, Flex, Img, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon } from "@components/shared"
import { SpLayer, SpVerified } from "@components/shared/icons"
import { currency } from "@utils"

import usePortfolio from "../usePortfolio"

interface CardProps extends BoxProps {
  data: ReturnType<typeof usePortfolio>["collectionData"][number]
  isFetched: boolean
}

const CollectionCard = ({ data, isFetched, ...rest }: CardProps) => {
  const [imageLoad, setImageLoad] = useState(false)
  return (
    <Box
      onClick={data.onView}
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
      {...rest}
    >
      <Skeleton pos="relative" display="flex" isLoaded={imageLoad && isFetched}>
        <Img
          src={data.bannerImage ?? "https://via.placeholder.com/150"}
          alt={data.name}
          loading="lazy"
          h="10rem"
          w="full"
          objectFit="cover"
          quality={100}
          onLoad={() => setImageLoad(true)}
        />
        <Flex
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          align="center"
          py={0.5}
          px={2}
          rounded="full"
          bg="white"
          pos="absolute"
          bottom={4}
          left={4}
        >
          <SpLayer />
          <Text ml={1} color="neutral.900" fontWeight={600}>
            {data.total ?? 0}
          </Text>
        </Flex>
      </Skeleton>
      <Flex p={4} align="center">
        <Skeleton isLoaded={imageLoad && isFetched} rounded="full">
          <Avatar size="lg" src={data.logoImage || ""} />
        </Skeleton>
        <Box flex={1} ml={6}>
          <Skeleton isLoaded={isFetched}>
            <Flex mb={2} align="center">
              <Text fontWeight={600} mr={1} fontSize="lg">
                {data.name}
              </Text>
              <Box pt="2px">{data.isVerified && <SpVerified viewBox="-2 0 20 18" size="1.4rem" />}</Box>
            </Flex>
          </Skeleton>
          <Flex align="center">
            <Skeleton isLoaded={isFetched}>
              <Text fontWeight={600} color="neutral.400">
                Volume
              </Text>
              <Flex align="center">
                <EthereumIcon />
                <Text color="neutral.50">{currency(parseFloat(data.totalVolume ?? "0"))}</Text>
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={isFetched} ml={8}>
              <Text fontWeight={600} color="neutral.400">
                Floor Price
              </Text>
              <Flex align="center">
                <EthereumIcon />
                <Text color="neutral.50">{currency(parseFloat(data.floorPrice ?? "0"))} </Text>
              </Flex>
            </Skeleton>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
export default CollectionCard
