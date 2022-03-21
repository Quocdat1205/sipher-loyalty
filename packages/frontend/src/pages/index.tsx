import { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import ContentHome from "@components/UI/home"

import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return <ContentHome />
}

HomePage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default HomePage
