import React from "react"
import { useRouter } from "next/router"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner } from "@components/shared"

import { CollectionContainer } from "./collection"
import General from "./General"
import { TokensContainer } from "./tokens"

const tabs = [
  { label: "NFTs", name: "nfts" },
  { label: "Tokens", name: "tokens" },
]

const ContentPortfolio = () => {
  const router = useRouter()
  const currentTab = router.query.tab || "nfts"

  const renderTabs = () => {
    if (currentTab === "nfts") {
      return <CollectionContainer />
    }
    if (currentTab === "tokens") {
      return <TokensContainer />
    }

    return null
  }

  return (
    <Flex flexDir="column" align="center" flex={1}>
      <Banner title="Portfolio" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
      <Box px={[4, 0]} py={8} flex={1} w="full" maxW="1200px">
        <General />
        <TabPage tabs={tabs} />
        <Box py={6}>{renderTabs()}</Box>
      </Box>
    </Flex>
  )
}

export default ContentPortfolio
