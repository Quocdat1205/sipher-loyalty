import "swiper/css"
import "swiper/css/pagination"

import React from "react"
import { Box, Flex, Img, Text } from "@sipher.dev/sipher-ui"

import GeneralContainer from "@components/UI/home/GeneralContainer"

import usePortFolioHome from "./portfolio/usePortFolioHome"
import SlideComponent from "./slide/SlideComponent"
import PortfolioHome from "./portfolio"

import "react-multi-carousel/lib/styles.css"

const slideData = [
  {
    title: "Spaceship Lootbox",
    description: "Lootboxes are ready to be minted and tradeable",
    srcBg: "/images/home/banner_home1.png",
    buttonText: "EXPLORE",
    destination: "/spaceship",
  },
  {
    title: "Exclusive Sculptures",
    description: "From virtuality to reality, embrace an authentic look and feel of our digital characters",
    srcBg: "/images/home/banner_home2.png",
    buttonText: "CHECK IT OUT",
    destination: "/portfolio",
  },
  {
    title: "Sipher Airdrops",
    description: "Where to find our latest airdrops with the most exciting gifts to claim",
    srcBg: "/images/home/banner_home3.png",
    buttonText: "CHECK IT OUT",
    destination: "/airdrop",
  },
]

export interface PortfolioHomeProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"][number]
  tokensData: ReturnType<typeof usePortFolioHome>["tokensData"][number][]
  totalNFTs: number
  totalToken: number
}

const ContentHome = () => {
  const { collectionData, tokensData, totalNFTs, totalToken, totalPortfolioPrice } = usePortFolioHome()

  return (
    <Flex overflow="hidden" flexDir="column" align="center" flex={1}>
      <SlideComponent data={slideData} />
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
