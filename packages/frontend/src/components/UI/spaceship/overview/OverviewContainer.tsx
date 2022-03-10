import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { SpaceshipContainer } from "./SpaceshipContainer"
import { WhatSpaceship } from "./WhatSpaceship"

export const OverviewContainer = () => {
  return (
    <Box>
      <SpaceshipContainer />
      <WhatSpaceship />
    </Box>
  )
}
