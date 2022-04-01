import { Fragment } from "react"
import Image from "next/image"
import { Box } from "@sipher.dev/sipher-ui"

import { SpaceshipContainer } from "./SpaceshipContainer"
import { WhatSpaceship } from "./WhatSpaceship"

const OverviewContainer = () => {
  return (
    <Fragment>
      <SpaceshipContainer />
      <WhatSpaceship />
      <Box sx={{ img: { rounded: "lg" } }} pos="relative">
        <Image
          src="/images/spaceship/banner-benefit.png"
          alt="banner"
          width={1440}
          height={510}
          layout="responsive"
          objectFit="contain"
          quality={100}
        />
      </Box>
    </Fragment>
  )
}

export default OverviewContainer
