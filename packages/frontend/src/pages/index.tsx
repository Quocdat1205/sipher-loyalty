import { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ContentHome from "@components/UI/home"

import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Ather Labs | Loyalty Dashboard" description="Ather Labs Loyalty Dashboard is now live!" />
      <ContentHome />
    </>
  )
}

HomePage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default HomePage
