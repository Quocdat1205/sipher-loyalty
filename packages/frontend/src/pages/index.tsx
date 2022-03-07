import { ReactNode } from "react"

import { Layout } from "@components/module/layout"
import ContentHome from "@components/UI/home"

import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return <ContentHome />
}

HomePage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default HomePage
