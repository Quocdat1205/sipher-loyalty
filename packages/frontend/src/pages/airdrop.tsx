import { ReactNode } from "react"

import { Layout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentAirDrop from "@components/UI/airdrop"

import { NextPageWithLayout } from "./_app"

const PortfolioPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Airdrops" description="" />
      <ContentAirDrop />
    </>
  )
}

PortfolioPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default PortfolioPage
