import React, { useEffect, useState } from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import { useWidth } from "@hooks"

import ActionContainer from "./ActionContainer"
import HeaderDetails from "./HeaderDetails"
import NftImage from "./NftImage"
import TabContainer from "./TabContainer"

interface DetailBoxProps {
  collectionId: string
  tokenId: string
}

const DetailNFT = ({ collectionId, tokenId }: DetailBoxProps) => {
  const [boxWidth, setBoxWidth] = useState(0)
  const windowWidth = useWidth()
  // right UI info details
  const widthContainer = 800

  useEffect(() => {
    setBoxWidth(windowWidth.width - widthContainer)
  }, [windowWidth])

  return (
    <Flex flex={1} flexDir="column" align="center">
      <Flex w="full" flex={1} flexDir={["column", "row"]}>
        <Box
          px={4}
          pos="fixed"
          top="60px"
          bottom="0"
          left="0"
          right={`${widthContainer}px`}
          display={["none", "none", "block"]}
          textAlign="center"
        >
          <NftImage windowHeight={windowWidth.height} src={"/images/spaceship/box.png"} alt={"a"} />
        </Box>
        <Flex flex={1} pl={[0, `${boxWidth - 8}px`]} flexDir="column">
          <Box flex={1} py={8} px={[4, 0]}>
            <Box mb={4} display={["block", "block", "none"]} textAlign="center">
              <NftImage src={"/images/spaceship/box.png"} alt={"a"} />
            </Box>
            <Box maxWidth={`${widthContainer}px`} flex={1}>
              <HeaderDetails
                creator={"1"}
                owner={"1"}
                user={[]}
                name={"1"}
                isFetched={false}
                contractAddress={collectionId}
                tokenId={tokenId}
                rarityRank={0}
                viewFavorite={0}
                viewCount={1}
              />
              <TabContainer isFetched={false} tokenId={tokenId} contractAddress={collectionId} />
            </Box>
          </Box>
          <ActionContainer />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default DetailNFT
