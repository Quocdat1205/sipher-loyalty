import React from "react"
import { Box, SimpleGrid } from "@sipher.dev/sipher-ui"

import usePortfolio from "../usePortfolio"

import CollectionCard from "./CollectionCard"
import FilterBar from "./FilterBar"
import LoadingCollectionCard from "./LoadingCollectionCard"

interface CollectionContainerProps {
  setFilter: (v: string) => void
  isFetched: boolean
  collectionData: ReturnType<typeof usePortfolio>["collectionData"]
  isLoadingCollection: boolean
}

const CollectionContainer = ({
  setFilter,
  collectionData,
  isFetched,
  isLoadingCollection,
}: CollectionContainerProps) => {
  const renderLoading = () => {
    return Array.from(Array(8).keys()).map(i => <LoadingCollectionCard key={i} />)
  }

  const renderNFTs = () => {
    if (isLoadingCollection) {
      return renderLoading()
    }
    return collectionData?.map(i => <CollectionCard key={i.id} data={i} isFetched={isFetched} />)
  }

  return (
    <Box>
      <FilterBar setFilter={setFilter} />
      <SimpleGrid spacing={6} columns={[1, 2, 3, 3, 3]}>
        {renderNFTs()}
      </SimpleGrid>
    </Box>
  )
}
export default CollectionContainer
