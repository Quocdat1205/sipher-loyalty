import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import CarouselCompo from "../CarouselCompo"

import usePortFolioHome from "./usePortFolioHome"

interface NFTsContainerProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"]
}

const NFTsContainer = ({ collectionData }: NFTsContainerProps) => {
  return (
    <Box
      overflow="hidden"
      sx={{
        ".carousel-item-padding-40-px": { pl: 6 },
        ".custom-dot-list-style": {
          pos: "relative",
          pt: 4,
        },
      }}
    >
      <CarouselCompo collectionData={collectionData} />
    </Box>
  )
}
export default NFTsContainer
