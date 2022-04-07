import React, { Fragment } from "react"
import { Box, Button, Flex, SimpleGrid, Skeleton, Text } from "@sipher.dev/sipher-ui"

import NoItemUI from "@components/shared/NoItemUI"

import { LoadingBoxCard } from "./LoadingBoxCard"
import { MintModal } from "./MintModal"
import { BoxCard, useInventory } from "."

export const InventoryContainer = () => {
  const {
    totalLootbox,
    isLoadingLootBox,
    isFetchedLootBox,
    dataMinted,
    isLoading,
    isStatusModal,
    handleMint,
    inventoryData,
    inventoryDataCheck,
    setIsStatusModal,
  } = useInventory()

  const renderLoading = () => {
    return Array.from(Array(1).keys()).map(i => <LoadingBoxCard key={i} />)
  }
  const renderNFTs = () => {
    if (isLoadingLootBox) {
      return (
        <Fragment>
          <Skeleton maxW="5rem" mb={4}>
            <Text color="neutral.300" fontWeight={600}>
              TOTAL:
            </Text>
          </Skeleton>
          <SimpleGrid spacing={6} columns={[1, 3, 4, 4, 4]}>
            {renderLoading()}
          </SimpleGrid>
        </Fragment>
      )
    }
    if (inventoryData.length === 0) {
      return <NoItemUI />
    }
    return (
      <Fragment>
        <Box mb={4}>
          <Text color="neutral.300" fontWeight={600}>
            TOTAL: {totalLootbox} {totalLootbox > 0 ? "Items" : "Item"}
          </Text>
        </Box>
        {inventoryDataCheck?.length !== 0 && (
          <Button onClick={() => setIsStatusModal("MINT")} mb={4}>
            MINT NFT({inventoryDataCheck?.length})
          </Button>
        )}
        <SimpleGrid spacing={6} columns={[1, 3, 4, 4, 4]}>
          {inventoryData?.map(i => (
            <BoxCard key={i.id} data={i} isFetched={isFetchedLootBox} />
          ))}
        </SimpleGrid>
      </Fragment>
    )
  }

  return (
    <Flex flexDir="column" align="center">
      <Box px={[4, 4, 4, 0, 0]} py={6} maxW="1200px" w="full">
        {renderNFTs()}
      </Box>
      <MintModal
        isLoading={isLoading}
        status={isStatusModal}
        dataMinted={dataMinted}
        handleMint={handleMint}
        dataMint={inventoryDataCheck ?? []}
        isOpen={isStatusModal !== ""}
        onClose={() => setIsStatusModal("")}
      />
    </Flex>
  )
}
