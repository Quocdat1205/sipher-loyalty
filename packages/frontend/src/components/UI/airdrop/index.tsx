import { useRouter } from "next/router"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { Banner } from "@components/shared"

import { useAirdrops } from "./useAirdrops"

const tabs = [
  { label: "All", name: "all" },
  { label: "NFTs", name: "nfts" },
  { label: "Tokens", name: "tokens" },
  { label: "Merch", name: "merch" },
]

const AirdropUI = () => {
  const {} = useAirdrops()
  const router = useRouter()
  const currentTab = router.query.tab || "all"

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
