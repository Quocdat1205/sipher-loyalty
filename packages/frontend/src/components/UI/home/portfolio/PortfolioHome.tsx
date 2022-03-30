import React from "react"
import { BiChevronRight } from "react-icons/bi"
import { useRouter } from "next/router"
import { Box, Button, Flex, Text } from "@sipher.dev/sipher-ui"

import { PortfolioHomeProps } from ".."

import TabContainer from "./TabContainer"

const PortfolioHome = ({ collectionData, tokensData, totalNFTs, totalToken }: PortfolioHomeProps) => {
  const router = useRouter()

  return (
    <Box mb={8}>
      <Flex mb={4} align="center" justify="space-between">
        <Text fontSize="2xl" fontWeight={600}>
          Portfolio
        </Text>
        <Button onClick={() => router.push("/portfolio")} color="accent.500" variant="link">
          <Text>See All</Text>
          <Box>
            <BiChevronRight size="1.2rem" />
          </Box>
        </Button>
      </Flex>
      <TabContainer
        collectionData={collectionData}
        tokensData={tokensData}
        totalNFTs={totalNFTs}
        totalToken={totalToken}
      />
    </Box>
  )
}
export default PortfolioHome
