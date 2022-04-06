import React from "react"
import { BiChevronLeft } from "react-icons/bi"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"

import { Metadata } from "@components/shared"
import { SpVerified } from "@components/shared/icons"
import { capitalize } from "@utils"

import GridSelector from "../GridSelector"
import { BringModal } from "../modal"

import LoadingCard from "./LoadingCard"
import NFTCard from "./NFTCard"
import useNFTs from "./useNFTs"

interface DetailsCollectionProps {
  collectionId: string
}

const DetailsCollection = ({ collectionId }: DetailsCollectionProps) => {
  const {
    gridSize,
    collectionData,
    columns,
    total,
    nftsData,
    isFetched,
    query,
    router,
    nftsDataCheck,
    handleClick,
    modal,
    setModal,
    handleBurn,
    dataMinted,
    isLoadingBurn,
  } = useNFTs(collectionId)
  const { data, hasNextPage, fetchNextPage, isLoading } = query

  const renderLoadingCards = () => {
    return Array.from(Array(8).keys()).map(i => <LoadingCard key={i} gridSize={gridSize} />)
  }
  const renderNFTs = () => {
    if (isLoading) {
      return renderLoadingCards()
    }
    return nftsData?.map((i, idx) => <NFTCard key={idx} data={i} isFetched={isFetched} gridSize={gridSize} />)
  }

  return (
    <Flex flexDir="column" flex={1} w="full" pos="relative">
      <Metadata
        title={
          isFetched
            ? `Ather Labs Dashboard | ${capitalize(collectionData?.name?.toLowerCase() ?? "")}`
            : "Ather Labs Dashboard | Loading..."
        }
        description=""
      />
      <Flex pos="fixed" top="4.5rem" left={0} zIndex={1} flexDir="column">
        <Box pt={8} px={8} w="full">
          <Button
            onClick={() => router.push("/portfolio")}
            pl={2}
            bg="white"
            rounded="full"
            colorScheme="neutral"
            role="group"
            _hover={{ color: "white", bg: "neutral.600" }}
            variant="secondary"
            alignItems="center"
          >
            <Box _groupHover={{ color: "white" }} color="neutral.500">
              <BiChevronLeft size="1.4rem" />
            </Box>
            <Text _groupHover={{ color: "white" }} color="neutral.500">
              BACK
            </Text>
          </Button>
        </Box>
      </Flex>
      <Skeleton isLoaded={isFetched} flexDir="column" w="full" justify="center" position="relative">
        <Img
          src={collectionData?.bannerImage ?? "/images/spaceship/banner.png"}
          maxH="20rem"
          w="full"
          objectFit="cover"
          alt={"banner"}
        />
      </Skeleton>
      <Flex flex={1} flexDir="column" w="full" align="center">
        <Flex flexDir="column" px={[4, 4, 4, 0, 0]} w="full" maxW="1200px">
          <Stack mb={4} flexDir="column" align="center" pos="relative" w="full">
            <Skeleton pos="absolute" transform="translateY(-50%)" isLoaded={isFetched} rounded="full">
              <Avatar src={collectionData?.logoImage} size="xl" />
            </Skeleton>
            <Box pt={12} />
            <Skeleton isLoaded={isFetched}>
              <Flex minW="10rem" minH="2.5rem" align="center">
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
            <Skeleton isLoaded={isFetched}>
              <Text>
                Created by <chakra.span color="cyan.600">Sipher</chakra.span>
              </Text>
            </Skeleton>
          </Stack>
          <Flex mb={4} align="center" justify="space-between" w="full">
            <Box>
              <Text color="neutral.300" fontWeight={600}>
                TOTAL: {total} {total > 0 ? "NFTs" : "NFT"}
              </Text>
            </Box>
            <GridSelector />
          </Flex>
          <Flex>
            {collectionData?.category === "lootbox" && nftsDataCheck.length > 0 ? (
              <Button onClick={handleClick}>{`BRING TO OFF-CHAIN (${nftsDataCheck?.length})`}</Button>
            ) : (
              ""
            )}
          </Flex>
          <Box py={8} flex={1} w="full">
            <InfiniteScroll
              dataLength={data ? total : 0}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
              loader={
                <SimpleGrid mt={6} spacing={6} columns={columns}>
                  {renderLoadingCards()}
                </SimpleGrid>
              }
              scrollableTarget="scrollContainer"
            >
              <SimpleGrid spacing={6} columns={columns}>
                {renderNFTs()}
              </SimpleGrid>
            </InfiniteScroll>
          </Box>
        </Flex>
      </Flex>
      <BringModal
        isLoading={isLoadingBurn}
        status={modal}
        dataMinted={dataMinted}
        handleBurn={handleBurn}
        dataMint={nftsDataCheck ?? []}
        isOpen={modal !== ""}
        onClose={() => setModal("")}
      />
    </Flex>
  )
}
export default DetailsCollection
