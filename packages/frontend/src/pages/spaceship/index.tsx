import { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentSpaceship from "@components/UI/spaceship"

import { NextPageWithLayout } from "../_app"

const SpaceshipPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata
        title="Spaceship | Sipher Dashboard"
        description="Transport yourself throughout the various dungeons and the World of Sipheria"
      />
      <ContentSpaceship />
    </>
  )
}

SpaceshipPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default SpaceshipPage
