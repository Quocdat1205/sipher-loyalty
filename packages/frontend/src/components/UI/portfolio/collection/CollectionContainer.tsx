import React from "react"
import { Box, SimpleGrid } from "@sipher.dev/sipher-ui"

import FilterBar from "./FilterBar"
import { useCollection } from "./useCollection"
import { CollectionCard } from "."

export const CollectionContainer = () => {
  const { handleClick } = useCollection()

  const renderNFTs = () => {
    return Array.from(Array(12).keys()).map(i => (
      <CollectionCard
        onClick={handleClick}
        isVerified
        key={i}
        volume={1}
        floorPrice={1}
        collectionId={"1"}
        collectionName="Sipherian Surge"
        imageUrl="/images/nft/sipher3.png"
      />
    ))
  }

  return (
    <Box>
      <FilterBar />
      <SimpleGrid pt={8} spacing={6} columns={3}>
        {renderNFTs()}
      </SimpleGrid>
    </Box>
  )
}
