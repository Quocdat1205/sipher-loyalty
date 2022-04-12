import React, { Fragment } from "react"
import { useRouter } from "next/router"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner, WarningUI } from "@components/shared"

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
      <Banner
        srcBg="/images/spaceship/banner.png"
        title="Spaceship"
        description="Transport yourself throughout the various dungeons and the World of Sipheria"
      />
      <Flex
        flexDir="column"
        overflow="hidden"
        pos="relative"
        align="center"
        flex={1}
        bgGradient={
          currentTab === "overview" || currentTab === "claim"
            ? "transparent"
            : "linear(150deg, #8A31E2 -125%, #0F041A 50%)"
        }
        w="full"
      >
        {currentTab !== "overview" && currentTab !== "claim" && (
          <Fragment>
            <WarningUI />
            <Box px={[4, 4, 4, 0, 0]} pt={16} w="full" maxW="1200px">
              <TabPage tabs={spaceshipTabs} />
            </Box>
          </Fragment>
        )}

        <Flex flexDir="column" flex={1} w="full">
          {renderTabs()}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ContentSpaceship
