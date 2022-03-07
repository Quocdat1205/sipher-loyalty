import { ReactNode } from "react"

import { Layout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentSpaceShip from "@components/UI/spaceship"

import { NextPageWithLayout } from "./_app"

const PortfolioPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Spaceship" description="" />
      <ContentSpaceShip />
    </>
  )
}

PortfolioPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default PortfolioPage
