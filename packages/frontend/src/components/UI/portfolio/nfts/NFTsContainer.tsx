import React from "react"
import { Box, SimpleGrid } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"

import FilterBar from "../FilterBar"

import { NFTCard } from "."

export const NFTsContainer = () => {
  const gridSize = useStore(state => state.gridSize)
  const columns = gridSize === "small" ? [2, 3, 4, 5, 7] : [1, 2, 3, 4, 5]

  const renderNFTs = () => {
    return Array.from(Array(12).keys()).map(i => (
      <NFTCard
        key={i}
        liked={1}
        tokenId={"1"}
        price={0.1}
        name="Sipher Inu #2173"
        collectionId="0x4d91fa57abfead5fbc8445e45b906b85bbd9744c"
        imageUrl="/images/nft/sipher3.png"
      />
    ))
  }

  return (
    <Box>
      <FilterBar />
      <SimpleGrid pt={8} spacing={6} columns={columns}>
        {renderNFTs()}
      </SimpleGrid>
    </Box>
  )
}
