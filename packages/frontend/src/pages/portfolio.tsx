import React, { ReactNode } from "react"

import { Layout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentPortfolio from "@components/UI/portfolio"

import { NextPageWithLayout } from "./_app"

const PortfolioPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Portfolio" description="" />
      <ContentPortfolio />
    </>
  )
}

PortfolioPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default PortfolioPage
