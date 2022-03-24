import { ReactNode } from "react"
import { useRouter } from "next/router"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import { DetailsCollection } from "@components/UI/portfolio/collection"
import { NextPageWithLayout } from "src/pages/_app"

const CollectionDetailsPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <>
      <Metadata title="Portfolio" description="Details Collection" />
      <DetailsCollection collectionId={router.query.contractAddress as string} />
    </>
  )
}

CollectionDetailsPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default CollectionDetailsPage
