import React, { Fragment } from "react"
import { Box, Flex, Img, Text } from "@sipher.dev/sipher-ui"

import GeneralContainer from "@components/UI/home/GeneralContainer"

import usePortFolioHome from "./portfolio/usePortFolioHome"
import { Slide1 } from "./slide/Slide1"
import { Slide2 } from "./slide/Slide2"
import { Slide3 } from "./slide/Slide3"
import SlideComponent from "./slide/SlideComponent"
import PortfolioHome from "./portfolio"

import "react-multi-carousel/lib/styles.css"

const slideCompo = [<Slide1 />, <Slide2 />, <Slide3 />]

export interface PortfolioHomeProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"][number]
  tokensData: ReturnType<typeof usePortFolioHome>["tokensData"][number][]
  totalNFTs: number
  totalToken: number
}

const ContentHome = () => {
  const { collectionData, tokensData, totalNFTs, totalToken, totalPortfolioPrice } = usePortFolioHome()

  return (
    <Flex flexDir="column" align="center" flex={1}>
      <SlideComponent isAuto infiniteLoop show={1}>
        {slideCompo.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </SlideComponent>
      <Box px={[4, 4, 4, 0, 0]} py={8} flex={1} w="full" maxW="1200px">
        <GeneralContainer totalPortfolioPrice={totalPortfolioPrice} />
        <PortfolioHome
          collectionData={collectionData}
          tokensData={tokensData}
          totalNFTs={totalNFTs}
          totalToken={totalToken}
        />
        <Box sx={{ img: { rounded: "lg" } }} pos="relative">
          <Img src="/images/home/banner-home.png" alt="banner" maxH="26rem" objectFit="cover" />
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
