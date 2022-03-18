import { ReactNode } from "react"

import { LayoutSpaceship } from "@components/module/layout"
import { Metadata } from "@components/shared"
import { OverviewContainer } from "@components/UI/spaceship"

import { NextPageWithLayout } from "../_app"

const SpaceshipPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Spaceship" description="Overview" />
      <OverviewContainer />
    </>
  )
}

SpaceshipPage.getLayout = (page: ReactNode) => <LayoutSpaceship>{page}</LayoutSpaceship>

export default SpaceshipPage
