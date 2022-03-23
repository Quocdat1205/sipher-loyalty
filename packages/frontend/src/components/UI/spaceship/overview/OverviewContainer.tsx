import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { SpaceshipContainer } from "./SpaceshipContainer"
import { useOverview } from "./useOverview"
import { WhatSpaceship } from "./WhatSpaceship"

export const OverviewContainer = () => {
  const { mappedData, activeData } = useOverview()
  return (
    <Box>
      <SpaceshipContainer mappedData={mappedData} activeData={activeData!} />
      <WhatSpaceship />
    </Box>
  )
}
