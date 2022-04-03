import React from "react"
import { Box, Button, Flex, SimpleGrid } from "@sipher.dev/sipher-ui"

import NoItemUI from "@components/shared/NoItemUI"

import { MintModal } from "./MintModal"
import { BoxCard, useInventory } from "."

export const InventoryContainer = () => {
  const {
    isFetchedLootBox,
    dataMinted,
    isLoading,
    isStatusModal,
    handleMint,
    inventoryData,
    inventoryDataCheck,
    setIsStatusModal,
  } = useInventory()

  const renderNFTs = () => {
    return inventoryData!.map(i => <BoxCard key={i.id} data={i} isFetched={isFetchedLootBox} />)
  }

  return (
    <Flex flexDir="column" align="center">
      <Box px={[4, 4, 4, 0, 0]} py={6} maxW="1200px" w="full">
        {inventoryDataCheck?.length !== 0 && (
          <Button onClick={() => setIsStatusModal("MINT")} mb={4}>
            MINT NFT({inventoryDataCheck?.length})
          </Button>
        )}
        {inventoryData.length > 0 ? (
          <SimpleGrid spacing={6} columns={[1, 3, 4, 4, 4]}>
            {renderNFTs()}
          </SimpleGrid>
        ) : (
          <NoItemUI />
        )}
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
