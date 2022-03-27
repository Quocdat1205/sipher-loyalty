import React from "react"
import { useRouter } from "next/router"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner, NotifyNetwork } from "@components/shared"
import { POLYGON_NETWORK } from "@constant"

import ClaimContainer from "./claim"
import { InventoryContainer } from "./inventory"
import OverviewContainer from "./overview"
import { PendingContainer } from "./pending"

export const spaceshipTabs = [
  { label: "Overview", name: "overview" },
  { label: "Claim", name: "claim" },
  { label: "Inventory", name: "inventory" },
  { label: "Pending", name: "pending" },
]

const ContentSpaceship = () => {
  const router = useRouter()
  const currentTab = router.query.tab || "overview"

  const renderTabs = () => {
    if (currentTab === "overview") {
      return <OverviewContainer />
    }
    if (currentTab === "inventory") {
      return <InventoryContainer />
    }
    if (currentTab === "claim") {
      return <ClaimContainer />
    }
    if (currentTab === "pending") {
      return <PendingContainer />
    }
    return null
  }

  return (
    <Flex pos="relative" flexDir="column" align="center" flex={1}>
      <NotifyNetwork chainId={POLYGON_NETWORK} />
      <Banner
        srcBg="/images/spaceship/banner.png"
        title="Spaceship"
        description="Transport yourself throughout the various dungeons and the World of Sipheria"
      />
      {currentTab !== "overview" && (
        <Box px={[4, 4, 4, 0, 0]} pt={12} w="full" maxW="1200px">
          <TabPage tabs={spaceshipTabs} />
        </Box>
      )}
      <Flex flexDir="column" flex={1} w="full">
        {renderTabs()}
      </Flex>
    </Flex>
  )
}

export default ContentSpaceship
