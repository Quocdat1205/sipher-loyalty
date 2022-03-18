import React from "react"
import { Box, Button, Flex, SimpleGrid } from "@sipher.dev/sipher-ui"

import { MintModal } from "./MintModal"
import { BoxCard, useInventory } from "."

export const InventoryContainer = () => {
  const { handleMint, isSuccess, isModal, setIsModal, inventoryData, inventoryDataCheck, openModalMint, handleView } =
    useInventory()

  const renderNFTs = () => {
    return inventoryData.map(i => (
      <BoxCard
        key={i.id}
        tokenId={i.id}
        handleView={handleView}
        onClick={i.onSelect}
        name={i.name}
        imageUrl={i.imageUrl}
        isChecked={i.isChecked}
      />
    ))
  }

  return (
    <Flex flexDir="column" align="center">
      <Box py={6} maxW="1200px" w="full">
        {inventoryData.filter(i => i.isChecked).length !== 0 && (
          <Button onClick={openModalMint} mb={4}>
            MINT NFT({inventoryDataCheck.length})
          </Button>
        )}
        <SimpleGrid spacing={6} columns={[1, 3, 5]}>
          {renderNFTs()}
        </SimpleGrid>
      </Box>
      <MintModal
        isSuccess={isSuccess}
        handleMint={handleMint}
        dataMint={inventoryDataCheck}
        isOpen={isModal === "MINT"}
        onClose={() => setIsModal("")}
      />
    </Flex>
  )
}
