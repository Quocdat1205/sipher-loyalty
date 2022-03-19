import React from "react"
import { MdInfo } from "react-icons/md"
import { Box, Flex, HStack, Link, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { ClipboardCopy, CustomPopover } from "@components/shared"

import HeartAndView from "./HeartAndView"
import InfoNFT from "./InfoNFT"

interface HeaderDetailsProps {
  creator: string | undefined
  owner: string | undefined
  user: any[] | undefined
  isFetched: boolean
  contractAddress: string
  tokenId: string
  rarityRank: number
  name?: string
  viewCount: number
  viewFavorite: number
}

export const HeaderDetails = ({
  user,
  owner,
  creator,
  isFetched,
  contractAddress,
  tokenId,
  rarityRank,
  name,
  viewFavorite,
  viewCount,
}: HeaderDetailsProps) => {
  return (
    <>
      <Flex pr={2} w="full" align="center" justify={"space-between"} mb={2}>
        <Skeleton isLoaded={isFetched}>
          <Text fontWeight={600} letterSpacing="1px" fontSize={"4xl"}>
            {name}
          </Text>
        </Skeleton>
        <Skeleton display={["none", "block"]} isLoaded={isFetched}>
          <HeartAndView contractAddress={contractAddress} tokenId={tokenId} views={viewCount} likes={viewFavorite} />
        </Skeleton>
      </Flex>
      <Stack pr={2} mb={2} spacing={4}>
        <Skeleton isLoaded={isFetched}>
          <HStack align="center" spacing={[4, 8]} justify={["space-between", "flex-start"]} mb={4}>
            <Flex align="center">
              <Text fontWeight={600} color="neutral.400" mr={1}>
                Token ID:
              </Text>
              <Text mr={2}>{tokenId}</Text>
              <ClipboardCopy text={tokenId} />
            </Flex>
            <Flex align="center">
              <Text fontWeight={600} color="neutral.400" mr={1}>
                Rarity Rank:
              </Text>
              <Box textAlign="center" px={1} py={0.5} rounded="base" bg="purple.500" mr={2}>
                <Text w="full" textDecoration="underline">
                  #{rarityRank}
                </Text>
              </Box>
              <CustomPopover
                label="Rarity Rank Info"
                icon={
                  <Box color="neutral.500">
                    <MdInfo size="1.2rem" />
                  </Box>
                }
              >
                <Text color="neutral.900">
                  This Rarity ranking based on{" "}
                  <Link target="_blank" href="https://rarity.tools" color="blue.400">
                    https://rarity.tools
                  </Link>
                </Text>
              </CustomPopover>
            </Flex>
          </HStack>
        </Skeleton>
        <InfoNFT isFetched={isFetched} contractAddress={contractAddress} user={user} owner={owner} creator={creator} />
        <Skeleton display={["block", "none"]} isLoaded={isFetched}>
          <HeartAndView contractAddress={contractAddress} tokenId={tokenId} views={viewCount} likes={viewFavorite} />
        </Skeleton>
      </Stack>
    </>
  )
}
