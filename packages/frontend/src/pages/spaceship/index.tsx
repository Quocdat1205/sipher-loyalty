import { ReactNode } from "react"

import { Layout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentSpaceShip from "@components/UI/spaceship"

import { NextPageWithLayout } from "../_app"

const SpaceshipPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Spaceship" description="" />
      <ContentSpaceShip />
    </>
  )
}

SpaceshipPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default SpaceshipPage
