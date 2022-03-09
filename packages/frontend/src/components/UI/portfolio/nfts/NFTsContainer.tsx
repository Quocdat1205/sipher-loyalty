import React from "react"
import { Box, SimpleGrid } from "@sipher.dev/sipher-ui"

import FilterBar from "./FilterBar"
import { useNFTs } from "./useNFTs"
import { NFTCard } from "."

export const NFTsContainer = () => {
  const { columns } = useNFTs()

  const renderNFTs = () => {
    return Array.from(Array(12).keys()).map(i => (
      <NFTCard
        key={i}
        liked={1}
        tokenId={"1"}
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
