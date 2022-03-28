import React, { useState } from "react"
import Image from "next/image"
import { Avatar, Box, Flex, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon } from "@components/shared"
import { SpLayer, SpVerified } from "@components/shared/icons"
import { currency } from "@utils"

import usePortfolio from "../usePortfolio"

interface CardProps {
  data: ReturnType<typeof usePortfolio>["collectionData"]
  isFetched: boolean
}

const CollectionCard = ({ data, isFetched }: CardProps) => {
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
      <Skeleton pos="relative" display="flex" isLoaded={isFetched}>
        <Image src={data.bannerImage || ""} alt={data.name} loading="lazy" height={170} width={383} objectFit="cover" />
        <Flex align="center" py={0.5} px={2} rounded="full" bg="white" pos="absolute" bottom="0.5rem" left="0.5rem">
          <SpLayer />
          <Text ml={1} color="neutral.900" fontWeight={600}>
            {data.total}
          </Text>
        </Flex>
      </Skeleton>
      <Flex p={4} align="center">
        <Skeleton isLoaded={isFetched} rounded="full">
          <Avatar size="lg" src={data.logoImage || ""} />
        </Skeleton>
        <Box flex={1} ml={6}>
          <Skeleton isLoaded={isFetched}>
            <Flex mb={2} align="center">
              <Text fontWeight={600} mr={1} fontSize="lg">
                {data.name}
              </Text>
              <Box pt="2px">{data.isVerified && <SpVerified />}</Box>
            </Flex>
          </Skeleton>
          <Flex align="center">
            <Skeleton isLoaded={isFetched}>
              <Text fontWeight={600} color="neutral.400">
                Volume
              </Text>
              <Flex align="center">
                <EthereumIcon />
                <Text color="neutral.50">
                  {0} {""}M
                </Text>
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={isFetched} ml={8}>
              <Text fontWeight={600} color="neutral.400">
                Floor Price
              </Text>
              <Flex align="center">
                <EthereumIcon />
                <Text color="neutral.50">{currency(data.floorPrice ? data.floorPrice : 0)} </Text>
              </Flex>
            </Skeleton>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
export default CollectionCard
