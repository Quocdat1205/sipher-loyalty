import React, { Fragment } from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { Carousel } from "./Carousel"
import usePortFolioHome from "./usePortFolioHome"

interface NFTsContainerProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"]
}

const NFTsContainer = ({ collectionData }: NFTsContainerProps) => {
  return (
    <Fragment>
      <Box display={["none", "none", "block"]}>
        <Carousel slideData={collectionData} />
      </Box>
      <Box display={["block", "block", "none"]}>
        <Carousel slideData={collectionData} pageSize={2} />
      </Box>
    </Fragment>
  )
}
export default NFTsContainer
