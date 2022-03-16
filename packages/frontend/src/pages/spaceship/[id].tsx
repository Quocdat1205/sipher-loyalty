import { ReactNode } from "react"
import { useRouter } from "next/router"

import { DetailsLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import { DetailBox } from "@components/UI/spaceship/inventory"

import { NextPageWithLayout } from "../_app"

const SpaceshipDetailPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <>
      <Metadata title="Spaceship - Box" description="Details Box" />
      <DetailBox id={router.query.id} />
    </>
  )
}

SpaceshipDetailPage.getLayout = (page: ReactNode) => <DetailsLayout>{page}</DetailsLayout>

export default SpaceshipDetailPage
