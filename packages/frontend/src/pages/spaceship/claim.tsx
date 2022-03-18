import { ReactNode } from "react"

import { LayoutSpaceship } from "@components/module/layout"
import { Metadata } from "@components/shared"
import { ClaimContainer } from "@components/UI/spaceship"

import { NextPageWithLayout } from "../_app"

const SpaceshipPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Spaceship" description="Claim" />
      <ClaimContainer />
    </>
  )
}

SpaceshipPage.getLayout = (page: ReactNode) => <LayoutSpaceship>{page}</LayoutSpaceship>

export default SpaceshipPage
