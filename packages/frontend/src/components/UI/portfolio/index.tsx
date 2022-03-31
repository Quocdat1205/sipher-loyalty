import React from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner } from "@components/shared"

import CollectionContainer from "./collection"
import General from "./General"
import TokensContainer from "./tokens"
import usePortfolio from "./usePortfolio"

const tabs = [
  { label: "NFTs", name: "nfts" },
  { label: "Tokens", name: "tokens" },
]

const ContentPortfolio = () => {
  const {
    totalUsdPrice,
    totalETHPrice,
    totalCollectionPrice,
    tokensData,
    totalToken,
    totalNFTs,
    currentTab,
    collectionData,
    filter,
    setFilter,
    isFetched,
  } = usePortfolio()

  const renderTabs = () => {
    if (currentTab === "nfts") {
      return (
        <CollectionContainer
          isFetched={isFetched}
          filter={filter}
          setFilter={setFilter}
          collectionData={collectionData}
        />
      )
    }
    if (currentTab === "tokens") {
      return <TokensContainer tokensData={tokensData} />
    }

    return null
  }

  return (
    <Flex flexDir="column" align="center" flex={1}>
      <Banner
        srcBg="/images/portfolio/banner.png"
        title="Portfolio"
        description="Where to find your digital assets & balance"
      />
      <Box px={[4, 4, 4, 0, 0]} py={12} flex={1} w="full" maxW="1200px">
        <General
          totalCollectionPrice={totalCollectionPrice}
          totalNFTs={totalNFTs}
          totalToken={totalToken}
          totalETHPrice={totalETHPrice}
          totalUsdPrice={totalUsdPrice}
        />
        <TabPage tabs={tabs} />
        <Box py={6}>{renderTabs()}</Box>
      </Box>
    </Flex>
  )
}

export default ContentPortfolio
