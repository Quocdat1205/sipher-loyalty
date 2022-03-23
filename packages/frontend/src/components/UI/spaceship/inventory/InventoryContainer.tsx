import React from "react"
import { Box, Button, Flex, SimpleGrid } from "@sipher.dev/sipher-ui"

import { MintModal } from "./MintModal"
import { BoxCard, useInventory } from "."

export const InventoryContainer = () => {
  const { isLoading, isStatusModal, handleMint, inventoryData, inventoryDataCheck, setIsStatusModal } = useInventory()

  const renderNFTs = () => {
    return inventoryData!.map(i => <BoxCard key={i.id} data={i} />)
  }

  return (
    <Flex flexDir="column" align="center">
      <Box py={6} maxW="1200px" w="full">
        {inventoryDataCheck?.length !== 0 && (
          <Button onClick={() => setIsStatusModal("MINT")} mb={4}>
            MINT NFT({inventoryDataCheck?.length})
          </Button>
        )}
        <SimpleGrid spacing={6} columns={[1, 3, 5]}>
          {renderNFTs()}
        </SimpleGrid>
      </Box>
      <MintModal
        isLoading={isLoading}
        status={isStatusModal}
        handleMint={handleMint}
        dataMint={inventoryDataCheck ?? []}
        isOpen={isStatusModal !== ""}
        onClose={() => setIsStatusModal("")}
      />
    </Flex>
  )
}
