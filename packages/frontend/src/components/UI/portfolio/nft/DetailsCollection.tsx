import React from "react"
import Image from "next/image"
import { Avatar, Box, Flex, Heading, Link, SimpleGrid, Stack, Text } from "@sipher.dev/sipher-ui"

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
  const { collectionData, columns, total, nftsData } = useNFTs(collectionId)

  const renderNFTs = () => {
    return nftsData?.map(i => <NFTCard key={i.id} data={i} />)
  }

  console.log(collectionData)

  return (
    <Box pos="relative">
      <NotifyNetwork chainId={collectionData?.chainId} />
      <Box pos="relative" h="18rem">
        <Image
          src={collectionData?.bannerImage ?? "/images/spaceship/banner.png"}
          objectFit="cover"
          layout="fill"
          alt="banner"
        />
      </Box>
      <Flex flexDir="column" w="full" align="center">
        <Box px={[4, 4, 4, 0, 0]} w="full" maxW="1200px">
          <Stack mb={4} flexDir="column" align="center" pos="relative">
            <Avatar src={collectionData?.logoImage} pos="absolute" transform="translateY(-50%)" size="xl" />
            <Flex pt={16} align="center">
              <Heading mr={1} fontSize="3xl" fontWeight={600}>
                {capitalize(collectionData?.name.toLowerCase() ?? "")}
              </Heading>
              {collectionData?.isVerified && (
                <Box>
                  <SpVerified size="1.8rem" viewBox="-2 0 20 15" />
                </Box>
              )}
            </Flex>
            <Text>
              Created by{" "}
              <Link color="cyan.600" isExternal>
                Sipher
              </Link>
            </Text>
          </Stack>
          <Flex align="center" justify="space-between">
            <Text color="neutral.300" fontWeight={600}>
              TOTAL: {total} {total > 0 ? "NFTs" : "NFT"}
            </Text>
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
