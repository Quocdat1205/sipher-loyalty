import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import CarouselCompo from "../CarouselCompo"

import usePortFolioHome from "./usePortFolioHome"

interface NFTsContainerProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"]
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

const NFTsContainer = ({ collectionData }: NFTsContainerProps) => {
  return (
    <Box
      overflow="hidden"
      ml={-6}
      sx={{
        ".carousel-item-padding-40-px": { pl: 6 },
        ".custom-dot-list-style": {
          pos: "relative",
          pt: 4,
        },
      }}
    >
      <CarouselCompo collectionData={collectionData} responsive={responsive} />
    </Box>
  )
}
export default NFTsContainer
