import { ReactNode } from "react"

import { LayoutAirdrop } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentAirDrop from "@components/UI/airdrop"

import { NextPageWithLayout } from "../_app"

const AirdropPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Airdrops" description="NFTs" />
      <ContentAirDrop />
    </>
  )
}

AirdropPage.getLayout = (page: ReactNode) => <LayoutAirdrop>{page}</LayoutAirdrop>

export default AirdropPage
