import { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentSpaceship from "@components/UI/spaceship"

import { NextPageWithLayout } from "../_app"

const SpaceshipPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Spaceship" description="Overview" />
      <ContentSpaceship />
    </>
  )
}

SpaceshipPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default SpaceshipPage
