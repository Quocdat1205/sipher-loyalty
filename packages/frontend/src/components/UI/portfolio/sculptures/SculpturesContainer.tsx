import React from "react"
import { Box, Button, SimpleGrid } from "@sipher.dev/sipher-ui"

import { ShippingModal } from "../modal"

import { useSculptures } from "./useSculpltures"
import { SculptureCard } from "."

export const SculpturesContainer = () => {
  const { sculptureData, isModal, openModalShipping, closeModal } = useSculptures()

  const renderNFTs = () => {
    return sculptureData.map(i => (
      <SculptureCard
        key={i.id}
        tokenId={i.id}
        onClick={i.onSelect}
        name={i.name}
        collectionId={i.collectionId}
        imageUrl={i.imageUrl}
        isChecked={i.isChecked}
      />
    ))
  }

  return (
    <Box>
      {sculptureData.filter(i => i.isChecked).length !== 0 && (
        <Button onClick={openModalShipping} mb={4}>
          REDEEM ALL
        </Button>
      )}
      <SimpleGrid spacing={6} columns={[1, 2, 3, 4, 5]}>
        {renderNFTs()}
      </SimpleGrid>
      <ShippingModal isOpen={isModal === "SHIPPING"} onClose={closeModal} />
    </Box>
  )
}
