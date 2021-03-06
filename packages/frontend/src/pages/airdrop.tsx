import { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import AirdropUI from "@components/UI/airdrop"

import { NextPageWithLayout } from "./_app"

const AirdropPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Ather Labs Dashboard | Airdrops" description="All" />
      <AirdropUI />
    </>
  )
}

AirdropPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default AirdropPage
