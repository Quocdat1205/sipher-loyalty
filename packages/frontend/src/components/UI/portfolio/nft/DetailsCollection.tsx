import React from "react"
import Image from "next/image"
import { Avatar, Box, Flex, Heading, Link, SimpleGrid, Stack, Text } from "@sipher.dev/sipher-ui"

import { SpVerified } from "@components/shared/icons"

import GridSelector from "../GridSelector"

import { NFTCard, useNFTs } from "."

interface DetailsCollectionProps {
  collectionSlug: string
}

const DetailsCollection = ({ collectionSlug }: DetailsCollectionProps) => {
  const { columns, total, nftsData } = useNFTs(collectionSlug)

  const renderNFTs = () => {
    return nftsData?.map(i => <NFTCard key={i.id} data={i} />)
  }

  return (
    <Box>
      <Box pos="relative" h="18rem">
        <Image src="/images/spaceship/banner.png" layout="fill" alt="banner" />
      </Box>
      <Flex flexDir="column" w="full" align="center">
        <Box w="full" maxW="1200px">
          <Stack mb={4} flexDir="column" align="center" pos="relative">
            <Avatar pos="absolute" transform="translateY(-50%)" size="xl" />
            <Flex pt={16} align="center">
              <Heading mr={1} fontSize="3xl" fontWeight={600}>
                Sipherian Surge
              </Heading>
              <Box>
                <SpVerified size="1.8rem" viewBox="-2 0 20 15" />
              </Box>
            </Flex>
            <Text>
              Created by{" "}
              <Link color="cyan.600" isExternal>
                SIPHERxyz
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