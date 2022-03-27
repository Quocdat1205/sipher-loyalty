import React from "react"
import { Box, SimpleGrid } from "@sipher.dev/sipher-ui"

import usePortfolio from "../usePortfolio"

import CollectionCard from "./CollectionCard"
import FilterBar from "./FilterBar"

interface CollectionContainerProps {
  filter: { categories: string }
  setFilter: (v: any) => void
  isFetched: boolean
  collectionData: ReturnType<typeof usePortfolio>["collectionData"]
}

const CollectionContainer = ({ filter, setFilter, collectionData, isFetched }: CollectionContainerProps) => {
  const renderNFTs = () => {
    return collectionData?.map(i => <CollectionCard key={i.id} data={i} isFetched={isFetched} />)
  }

  return (
    <Box>
      <FilterBar filter={filter} setFilter={setFilter} />
      <SimpleGrid pt={8} spacing={6} columns={3}>
        {renderNFTs()}
      </SimpleGrid>
    </Box>
  )
}
export default CollectionContainer
