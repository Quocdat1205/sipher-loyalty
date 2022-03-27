import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { Carousel } from "./Carousel"
import usePortFolioHome from "./usePortFolioHome"

interface NFTsContainerProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"]
  isFetched: boolean
}

const NFTsContainer = ({ collectionData, isFetched }: NFTsContainerProps) => {
  return (
    <Box>
      <Carousel isFetched={isFetched} slideData={collectionData} />
    </Box>
  )
}
export default NFTsContainer
