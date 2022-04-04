import { Box, Flex, Link, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner, NotifyNetwork } from "@components/shared"
import NoItemUI from "@components/shared/NoItemUI"
import { ETHEREUM_NETWORK } from "@constant"

import AirdropCard from "./AirdropCard"
import { DetailsAirdrop } from "./DetailsAirdrop"
import LoadingAirdropCard from "./LoadingAirdropCard"
import { useAirdrops } from "./useAirdrops"

const tabs = [
  { label: "All", name: "all" },
  { label: "NFTs", name: "nft" },
  { label: "Tokens", name: "token" },
  { label: "Merch", name: "merch" },
  { label: "Other", name: "other" },
]

const AirdropUI = () => {
  const { allAirdrops, currentTab, isFetched, isLoadingAirdrops } = useAirdrops()

  const handleSendMail = () => {
    window.open("mailto:hello@sipher.xyz")
  }

  const renderLoading = () => {
    return Array.from(Array(8).keys()).map(i => <LoadingAirdropCard key={i} />)
  }

  const renderNFTs = () => {
    if (isLoadingAirdrops) {
      return renderLoading()
    }
    if (currentTab === "all") {
      return allAirdrops.map((item, index) => <AirdropCard key={index} data={item} isFetched={isFetched} />)
    } else {
      return allAirdrops
        .filter(airdrop => airdrop.type === currentTab.toString().toUpperCase())
        .map(item => <AirdropCard key={item.id} data={item} isFetched={isFetched} />)
    }
  }

  const renderTabContent = () => {
    if (currentTab === "all") {
      return allAirdrops.length > 0 ? (
        <SimpleGrid spacing={4} columns={[1, 2, 4, 5, 5]}>
          {renderNFTs()}
        </SimpleGrid>
      ) : (
        <NoItemUI text="No available Airdrops" />
      )
    } else {
      const airdrops = allAirdrops.filter(airdrop => airdrop.type === currentTab.toString().toUpperCase())
      return airdrops.length > 0 ? (
        <>
          <SimpleGrid spacing={4} columns={[1, 2, 4, 5, 5]}>
            {renderNFTs()}
          </SimpleGrid>
          {currentTab === "merch" && (
            <Text pt={4} color="neutral.300">
              * If you want to change to another item (equal or lesser than your current tier), please{" "}
              <Link isExternal onClick={handleSendMail} color="cyan.600" textDecor="underline">
                contact us
              </Link>{" "}
              before 15th April.{" "}
            </Text>
          )}
        </>
      ) : (
        <NoItemUI text="No available Airdrops" />
      )
    }
  }

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
          {renderTabContent()}
        </Box>
      </Flex>
      <DetailsAirdrop />
    </Flex>
  )
}

export default AirdropUI
