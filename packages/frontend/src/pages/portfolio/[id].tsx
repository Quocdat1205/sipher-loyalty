import { ReactNode } from "react"
import { useRouter } from "next/router"

import { Layout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import { DetailsCollection } from "@components/UI/portfolio/collection"

import { NextPageWithLayout } from "../_app"

const SpaceshipDetailPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <>
      <Metadata title="Portfolio" description="Details Collection" />
      <DetailsCollection id={router.query.id} />
    </>
  )
}

SpaceshipDetailPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

export default SpaceshipDetailPage
