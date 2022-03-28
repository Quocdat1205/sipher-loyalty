import React from "react"
import Image from "next/image"
import { Avatar, Box, Flex, Heading, Link, SimpleGrid, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { NotifyNetwork } from "@components/shared"
import { SpVerified } from "@components/shared/icons"
import { capitalize } from "@utils"

import GridSelector from "../GridSelector"

import NFTCard from "./NFTCard"
import useNFTs from "./useNFTs"

interface DetailsCollectionProps {
  collectionId: string
}

const DetailsCollection = ({ collectionId }: DetailsCollectionProps) => {
  const { collectionData, columns, total, nftsData, isFetched } = useNFTs(collectionId)

  const renderNFTs = () => {
    return nftsData?.map(i => <NFTCard key={i.id} data={i} isFetched={isFetched} />)
  }

  return (
    <Box pos="relative">
      <NotifyNetwork chainId={collectionData?.chainId} />
      <Skeleton isLoaded={isFetched} flexDir="column" w="full" justify="center" position="relative">
        <Image
          layout="responsive"
          quality={100}
          width={1440}
          height={212}
          src={collectionData?.bannerImage ?? "/images/spaceship/banner.png"}
          alt={"banner"}
        />
      </Skeleton>
      <Flex flexDir="column" w="full" align="center">
        <Box px={[4, 4, 4, 0, 0]} w="full" maxW="1200px">
          <Stack mb={4} flexDir="column" align="center" pos="relative">
            <Skeleton rounded="full" pos="absolute" transform="translateY(-50%)" isLoaded={isFetched}>
              <Avatar src={collectionData?.logoImage} size="xl" />
            </Skeleton>
            <Skeleton isLoaded={isFetched}>
              <Flex pt={16} align="center">
                <Heading mr={1} fontSize="3xl" fontWeight={600}>
                  {capitalize(collectionData?.name?.toLowerCase() ?? "")}
                </Heading>
                {collectionData?.isVerified && (
                  <Box>
                    <SpVerified size="1.8rem" viewBox="-2 0 20 15" />
                  </Box>
                )}
              </Flex>
            </Skeleton>
            <Text>
              Created by{" "}
              <Link color="cyan.600" isExternal>
                Sipher
              </Link>
            </Text>
          </Stack>
          <Flex align="center" justify="space-between">
            <Skeleton isLoaded={isFetched}>
              <Text color="neutral.300" fontWeight={600}>
                TOTAL: {total} {total > 0 ? "NFTs" : "NFT"}
              </Text>
            </Skeleton>
            <GridSelector />
          </Flex>
          <SimpleGrid py={8} maxW="1200px" w="full" spacing={6} columns={columns}>
            {renderNFTs()}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  )
}
export default DetailsCollection
