import { ReactNode } from "react"
import { useRouter } from "next/router"

import { DetailsLayout } from "@components/module/layout"
import { DetailBox } from "@components/UI/spaceship/inventory"

import { NextPageWithLayout } from "../_app"

const SpaceshipDetailPage: NextPageWithLayout = () => {
  const router = useRouter()

  return <DetailBox id={router.query.id as string} />
}

SpaceshipDetailPage.getLayout = (page: ReactNode) => <DetailsLayout>{page}</DetailsLayout>

export default SpaceshipDetailPage
