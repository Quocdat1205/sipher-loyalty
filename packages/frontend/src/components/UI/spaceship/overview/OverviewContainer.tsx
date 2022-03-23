import { Fragment } from "react"

import { SpaceshipContainer } from "./SpaceshipContainer"
import { WhatSpaceship } from "./WhatSpaceship"

const OverviewContainer = () => {
  return (
    <Fragment>
      <SpaceshipContainer />
      <WhatSpaceship />
    </Fragment>
  )
}

export default OverviewContainer
