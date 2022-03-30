import React, { useState } from "react"
import { Box, chakra, Flex, HStack, Image, Text } from "@sipher.dev/sipher-ui"

import TokensContainer from "@components/UI/portfolio/tokens"

import { PortfolioHomeProps } from ".."

import NFTsContainer from "./NFTsContainer"

const tabs = ["NFTs", "Tokens"] as const
type Tab = typeof tabs[number]

const TabContainer = ({ collectionData, tokensData, totalNFTs, totalToken }: PortfolioHomeProps) => {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0])

  const renderTabs = () => {
    if (currentTab === "NFTs") {
      return <NFTsContainer collectionData={collectionData} />
    }
    if (currentTab === "Tokens") {
      return <TokensContainer tokensData={tokensData} />
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
              {tab} <chakra.span color="accent.500">{tab === "NFTs" ? totalNFTs : totalToken}</chakra.span>
            </Text>
            <Flex ml={2} align="center" justify="center" minW="1.6rem" h="1.6rem" bg="neutral.700" rounded="full">
              {tab === "NFTs" ? (
                <Image src="/images/icons/coin1.png" h="1rem" objectFit="contain" />
              ) : (
                <Image src="/images/icons/coin.png" h="1rem" objectFit="contain" />
              )}{" "}
            </Flex>
          </Flex>
        ))}
      </HStack>
      <Box flex={1}>{renderTabs()}</Box>
    </Flex>
  )
}
export default TabContainer
