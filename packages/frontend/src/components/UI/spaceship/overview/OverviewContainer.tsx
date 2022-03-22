import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { SpaceshipContainer } from "./SpaceshipContainer"
import { useOverview } from "./useOverview"
import { WhatSpaceship } from "./WhatSpaceship"

export const OverviewContainer = () => {
  const { mappedData } = useOverview()
  return (
    <Box>
      <SpaceshipContainer />
      <WhatSpaceship />
    </Box>
  )
}
