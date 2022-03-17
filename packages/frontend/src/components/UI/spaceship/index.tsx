import React from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import { Banner } from "@components/shared"

import { TabContainer } from "./TabContainer"

const ContentSpaceShip = () => {
  return (
    <Flex flexDir="column" align="center" flex={1}>
      <Banner
        srcBg="/images/spaceship/banner.png"
        title="Spaceship"
        description="Transport yourself throughout the various dungeons and the World of Sipheria"
      />
      <Box px={[4, 0]} pt={8} flex={1} w="full">
        <TabContainer />
      </Box>
    </Flex>
  )
}

export default ContentSpaceShip
