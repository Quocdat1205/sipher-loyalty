import { ReactNode } from "react"

import { DetailsLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import DetailNFT from "@components/UI/portfolio/nft/details"
import { DetailProvider } from "@components/UI/portfolio/nft/details/useDetail"
import { NextPageWithLayout } from "src/pages/_app"

const SpaceshipDetailPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Portfolio - Detail NFT" description="Detail NFT" />
      <DetailProvider>
        <DetailNFT />
      </DetailProvider>
    </>
  )
}

SpaceshipDetailPage.getLayout = (page: ReactNode) => <DetailsLayout>{page}</DetailsLayout>

export default SpaceshipDetailPage
