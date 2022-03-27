import { Box, Flex, SimpleGrid } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner, NotifyNetwork } from "@components/shared"
import NoItemUI from "@components/shared/NoItemUI"
import { ETHEREUM_NETWORK } from "@constant"

import AirdropCard from "./AirdropCard"
import { useAirdrops } from "./useAirdrops"

const tabs = [
  { label: "All", name: "all" },
  { label: "NFTs", name: "nft" },
  { label: "Tokens", name: "token" },
  { label: "Merch", name: "merch" },
  { label: "Other", name: "other" },
]

const AirdropUI = () => {
  const { allAirdrops, currentTab } = useAirdrops()

  return (
    <Flex pos="relative" flexDir="column" align="center" flex={1}>
      <NotifyNetwork chainId={ETHEREUM_NETWORK} />
      <Banner
        srcBg="/images/airdrops/banner.png"
        title="Airdrops"
        description="Keep up with our latest airdrop and claim your gifts"
      />
      <Flex flexDir="column" px={[4, 4, 4, 0, 0]} py={12} flex={1} w="full" maxW="1200px">
        <TabPage tabs={tabs} />
        <Box py={4} flex={1}>
          {currentTab === "all" ? (
            allAirdrops.length > 0 ? (
              <SimpleGrid spacing={4} columns={5}>
                {allAirdrops.map((item, index) => (
                  <AirdropCard key={index} data={item} />
                ))}
              </SimpleGrid>
            ) : (
              <NoItemUI />
            )
          ) : allAirdrops.filter(airdrop => airdrop.type === currentTab.toString().toUpperCase()).length > 0 ? (
            <SimpleGrid spacing={4} columns={5}>
              {allAirdrops
                .filter(airdrop => airdrop.type === currentTab.toString().toUpperCase())
                .map(item => (
                  <AirdropCard key={item.id} data={item} />
                ))}
            </SimpleGrid>
          ) : (
            <NoItemUI />
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default AirdropUI
