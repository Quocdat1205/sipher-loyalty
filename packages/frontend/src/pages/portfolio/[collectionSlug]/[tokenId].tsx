import { ReactNode } from "react"
import { useRouter } from "next/router"

import { DetailsLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import DetailNFT from "@components/UI/portfolio/nft/details"
import { NextPageWithLayout } from "src/pages/_app"

const SpaceshipDetailPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { contractAddress, tokenId } = router.query
  return (
    <>
      <Metadata title="Portfolio - Detail NFT" description="Detail NFT" />
      <DetailNFT collectionId={contractAddress as string} tokenId={tokenId as string} />
    </>
  )
}

SpaceshipDetailPage.getLayout = (page: ReactNode) => <DetailsLayout>{page}</DetailsLayout>

export default SpaceshipDetailPage
