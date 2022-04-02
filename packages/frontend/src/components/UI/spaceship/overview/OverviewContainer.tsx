import { Fragment } from "react"
import { Box, Img } from "@sipher.dev/sipher-ui"

import { SpaceshipContainer } from "./SpaceshipContainer"
import { WhatSpaceship } from "./WhatSpaceship"

const OverviewContainer = () => {
  return (
    <Fragment>
      <SpaceshipContainer />
      <WhatSpaceship />
      <Box sx={{ img: { rounded: "lg" } }} pos="relative">
        <Img src="/images/spaceship/banner-benefit.png" alt="banner" objectFit="fill" w="full" />
      </Box>
    </Fragment>
  )
}

export default OverviewContainer
