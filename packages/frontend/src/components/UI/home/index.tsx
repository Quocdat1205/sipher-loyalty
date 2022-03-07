import React from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import GeneralContainer from "@components/UI/home/GeneralContainer"

import { PortfolioHome } from "./portfolio"
import { Slide1, Slide2, SlideComponent } from "./slide"

const slideData = [<Slide1 />, <Slide2 />]

const ContentHome = () => {
  return (
    <Flex flexDir="column" align="center" flex={1}>
      <SlideComponent slideData={slideData} />
      <Box py={8} flex={1} w="full" maxW="1200px">
        <GeneralContainer />
        <PortfolioHome />
      </Box>
    </Flex>
  )
}

export default ContentHome
