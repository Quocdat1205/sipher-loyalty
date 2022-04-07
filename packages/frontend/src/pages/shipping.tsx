import { ReactNode } from "react"

import { CommonLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ShippingUI from "@components/UI/shipping"

import { NextPageWithLayout } from "./_app"

const ShippingPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Ather Labs Dashboard | Shipping" description="All" />
      <ShippingUI />
    </>
  )
}

ShippingPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default ShippingPage
