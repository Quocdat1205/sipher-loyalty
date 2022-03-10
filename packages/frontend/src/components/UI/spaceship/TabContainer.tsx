import React, { useState } from "react"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { InventoryContainer } from "./inventory"
import { OverviewContainer } from "./overview"

const tabs = ["Overview", "Inventory"] as const
type Tab = typeof tabs[number]

export const TabContainer = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0])

  const renderTabs = () => {
    if (currentTab === "Overview") {
      return <OverviewContainer />
    }
    if (currentTab === "Inventory") {
      return <InventoryContainer />
    }
    return null
  }

  return (
    <Flex align="center" flexDir="column" flex={1} h="full">
      <HStack maxW="1200px" w="full" spacing={8} overflow="hidden" borderBottom="1px" borderColor="neutral.700">
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
      <Box w="full" flex={1}>
        {renderTabs()}
      </Box>
    </Flex>
  )
}
