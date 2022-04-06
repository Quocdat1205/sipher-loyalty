import { ReactNode } from "react"

import { DetailsLayout } from "@components/module/layout"
import DetailNFT from "@components/UI/portfolio/nft/details"
import { DetailProvider } from "@components/UI/portfolio/nft/details/useDetail"
import { NextPageWithLayout } from "src/pages/_app"

const SpaceshipDetailPage: NextPageWithLayout = () => {
  return (
    <>
      <DetailProvider>
        <DetailNFT />
      </DetailProvider>
    </>
  )
}

SpaceshipDetailPage.getLayout = (page: ReactNode) => <DetailsLayout>{page}</DetailsLayout>

export default SpaceshipDetailPage
