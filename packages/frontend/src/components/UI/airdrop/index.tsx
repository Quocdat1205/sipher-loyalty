import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner } from "@components/shared"

import { useAirdrops } from "./useAirdrops"

const tabs = [
  { label: "All", name: "all" },
  { label: "NFTs", name: "nft" },
  { label: "Tokens", name: "token" },
  { label: "Merch", name: "merch" },
]

const AirdropUI = () => {
  const { currentTab } = useAirdrops()

  return (
    <Flex flexDir="column" align="center" flex={1}>
      <Banner title="Airdrops" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
      <Flex flexDir="column" px={[4, 0]} py={8} flex={1} w="full" maxW="1200px">
        <TabPage tabs={tabs} />
        <Box py={4} flex={1}>
          {currentTab}
        </Box>
      </Flex>
    </Flex>
  )
}

export default AirdropUI
