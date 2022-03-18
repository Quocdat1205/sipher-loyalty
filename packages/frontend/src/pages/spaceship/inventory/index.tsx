import { ReactNode } from "react"

import { LayoutSpaceship } from "@components/module/layout"
import { Metadata } from "@components/shared"
import { InventoryContainer } from "@components/UI/spaceship"
import { NextPageWithLayout } from "src/pages/_app"

const SpaceshipPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Spaceship" description="Inventory" />
      <InventoryContainer />
    </>
  )
}

SpaceshipPage.getLayout = (page: ReactNode) => <LayoutSpaceship>{page}</LayoutSpaceship>

export default SpaceshipPage
