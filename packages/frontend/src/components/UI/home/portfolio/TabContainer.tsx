import React, { useState } from "react"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { TokensContainer } from "@components/UI/portfolio/tokens"

import NFTsContainer from "./NFTsContainer"

const tabs = ["NFTs", "Tokens"] as const
type Tab = typeof tabs[number]

const TabContainer = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0])

  const renderTabs = () => {
    if (currentTab === "NFTs") {
      return <NFTsContainer />
    }
    if (currentTab === "Tokens") {
      return <TokensContainer />
    }
    return null
  }

  return (
    <Flex flexDir="column" flex={1} h="full">
      <HStack spacing={8} overflow="hidden" mb={4} borderBottom="1px" borderColor="neutral.700">
        {tabs.map(tab => (
          <Flex
            key={tab}
            align="center"
            py={2}
            borderBottom="2px"
            borderColor={currentTab === tab ? "accent.600" : "transparent"}
            onClick={() => setCurrentTab(tab)}
            cursor="pointer"
          >
            <Text fontWeight={600} color={currentTab === tab ? "neutral.50" : "neutral.400"}>
              {tab}
            </Text>
          </Flex>
        ))}
      </HStack>
      <Box flex={1}>{renderTabs()}</Box>
    </Flex>
  )
}
export default TabContainer
