import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { Carousel } from "./Carousel"

export const NFTsContainer = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <Box>
      <Carousel isAuto slideData={data} />
    </Box>
  )
}
