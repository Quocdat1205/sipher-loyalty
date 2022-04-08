import { ReactNode } from "react"

import { ShippingLayout } from "@components/module/layout"
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

ShippingPage.getLayout = (page: ReactNode) => <ShippingLayout>{page}</ShippingLayout>

export default ShippingPage
