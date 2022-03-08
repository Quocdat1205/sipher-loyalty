import React from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import { Banner } from "@components/shared"

import { TabContainer } from "./TabContainer"

const ContentAirDrop = () => {
  return (
    <Flex flexDir="column" align="center" flex={1}>
      <Banner title="Airdrops" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
      <Box px={[4, 0]} py={8} flex={1} w="full" maxW="1200px">
        <TabContainer />
      </Box>
    </Flex>
  )
}

export default ContentAirDrop
