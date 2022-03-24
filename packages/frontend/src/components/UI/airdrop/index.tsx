import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner, NotifyNetwork } from "@components/shared"
import { ETHEREUM_NETWORK } from "@constant"

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
    <Flex pos="relative" flexDir="column" align="center" flex={1}>
      <NotifyNetwork chainId={ETHEREUM_NETWORK} title="Ethereum Mainnet" />
      <Banner
        srcBg="/images/airdrops/banner.png"
        title="Airdrops"
        description="Keep up with our latest airdrop and claim your gifts"
      />
      <Flex flexDir="column" px={[4, 0]} py={12} flex={1} w="full" maxW="1200px">
        <TabPage tabs={tabs} />
        <Box py={4} flex={1}>
          {currentTab}
        </Box>
      </Flex>
    </Flex>
  )
}

export default AirdropUI
