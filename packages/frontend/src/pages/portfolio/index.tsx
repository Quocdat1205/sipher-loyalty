import React, { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentPortfolio from "@components/UI/portfolio"

import { NextPageWithLayout } from "../_app"

const PortfolioPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Portfolio | Loyalty Dashboard" description="" />
      <ContentPortfolio />
    </>
  )
}

PortfolioPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default PortfolioPage
