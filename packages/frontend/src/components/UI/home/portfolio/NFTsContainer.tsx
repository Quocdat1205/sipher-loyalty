import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { Carousel } from "./Carousel"
import usePortFolioHome from "./usePortFolioHome"

const NFTsContainer = () => {
  const { collectionData } = usePortFolioHome()

  return (
    <Box>
      <Carousel slideData={collectionData} />
    </Box>
  )
}
export default NFTsContainer
