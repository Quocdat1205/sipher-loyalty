import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { Carousel } from "./Carousel"
import usePortFolioHome from "./usePortFolioHome"

interface NFTsContainerProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"]
}

const NFTsContainer = ({ collectionData }: NFTsContainerProps) => {
  return (
    <Box>
      <Carousel slideData={collectionData} />
    </Box>
  )
}
export default NFTsContainer
