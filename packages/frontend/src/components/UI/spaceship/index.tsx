import React from "react"
import { useRouter } from "next/router"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner } from "@components/shared"

import { ClaimContainer } from "./claim"
import { InventoryContainer } from "./inventory"
import { OverviewContainer } from "./overview"

const tabs = [
  { label: "Overview", name: "overview" },
  { label: "Claim", name: "claim" },
  { label: "Inventory", name: "inventory" },
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
    return null
  }

  return (
    <Flex flexDir="column" align="center" flex={1}>
      <Banner title="Portfolio" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
      <Box px={[4, 0]} pt={8} w="full" maxW="1200px">
        <TabPage tabs={tabs} />
      </Box>
      <Box w="full">{renderTabs()}</Box>
    </Flex>
  )
}

export default ContentSpaceship
