import React from "react"
import Image from "next/image"
import { Box, Flex, Text } from "@sipher.dev/sipher-ui"

import GeneralContainer from "@components/UI/home/GeneralContainer"

import { PortfolioHome } from "./portfolio"
import { Slide1, Slide2, SlideComponent } from "./slide"

const slideData = [<Slide1 />, <Slide2 />]

const ContentHome = () => {
  return (
    <Flex flexDir="column" align="center" flex={1}>
      <SlideComponent isAuto slideData={slideData} />
      <Box py={8} flex={1} w="full" maxW="1200px">
        <GeneralContainer />
        <PortfolioHome />
        <Box pos="relative">
          <Image src="/images/home/banner-home.png" alt="banner" width={1200} height={360} />
          <Box pos="absolute" top="50%" left="0" transform="translate(25%,-50%)">
            <Text mb={2} fontSize="xl">
              Coming Soon!
            </Text>
            <Text lineHeight={1.2} fontWeight={600} fontSize="2xl">
              Enjoy extra Benefits &
            </Text>
            <Text lineHeight={1.2} fontWeight={600} fontSize="2xl">
              Earn exclusive Rewards
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default ContentHome
