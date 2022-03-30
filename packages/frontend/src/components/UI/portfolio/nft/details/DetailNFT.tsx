import React, { useEffect, useState } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { Box, Button, Flex, Text } from "@sipher.dev/sipher-ui"

import { useWidth } from "@hooks"

import ActionContainer from "./ActionContainer"
import HeaderDetails from "./HeaderDetails"
import { NftImage } from "./NftImage"
import TabContainer from "./TabContainer"
import { useDetailContext } from "./useDetail"

const DetailNFT = () => {
  const [boxWidth, setBoxWidth] = useState(0)
  const { tokenDetails, isFetched, router } = useDetailContext()
  const windowWidth = useWidth()
  // right UI info details
  const widthContainer = 800
  useEffect(() => {
    setBoxWidth(windowWidth.width - widthContainer)
  }, [windowWidth])
  return (
    <Flex flex={1} flexDir="column" align="center">
      <Flex pos="relative" w="full" flex={1} flexDir={["column", "column", "row"]}>
        <Flex pos="fixed" top="4rem" left={0} zIndex={1} flexDir="column">
          <Box pt={8} px={8} w="full">
            <Button onClick={() => router.back()} pl={2} bg="white" rounded="full" alignItems="center">
              <Box color="neutral.500">
                <BiChevronLeft size="1.4rem" />
              </Box>
              <Text color="neutral.500">Back</Text>
            </Button>
          </Box>
        </Flex>
        <Box
          px={4}
          pos="fixed"
          top="60px"
          bottom="0"
          left="0"
          right={`${widthContainer}px`}
          display={["none", "none", "block"]}
          sx={{
            "@media (max-width: 1199px)": {
              display: "none",
            },
          }}
        >
          <NftImage
            pt={8}
            isFetching={isFetched}
            mintable={tokenDetails?.value ?? 0}
            windowHeight={windowWidth.height}
            src={tokenDetails?.imageUrl ?? ""}
            alt={"Image NFT"}
          />
        </Box>
        <Flex
          flex={1}
          pl={[0, 0, `${boxWidth - 8}px`]}
          flexDir="column"
          sx={{
            "@media (max-width: 1199px)": {
              px: 4,
            },
          }}
        >
          <Box flex={1} py={8} px={[4, 0]}>
            <Box
              mb={4}
              display={["block", "block", "none"]}
              textAlign="center"
              sx={{
                "@media (max-width: 1199px)": {
                  display: "block",
                },
              }}
            >
              <NftImage
                mintable={tokenDetails?.value ?? 0}
                isFetching={isFetched}
                src={tokenDetails?.imageUrl ?? ""}
                alt={"Image NFT"}
              />
            </Box>
            <Box
              maxWidth={`${widthContainer}px`}
              flex={1}
              sx={{
                "@media (max-width: 1199px)": {
                  maxWidth: "unset",
                },
              }}
            >
              <HeaderDetails isFetched={isFetched} tokenDetails={tokenDetails} />
              <TabContainer isFetched={isFetched} />
            </Box>
          </Box>
          <ActionContainer isFetched={isFetched} />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default DetailNFT
