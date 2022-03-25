import { Box, Flex, Stack, Text } from "@sipher.dev/sipher-ui"

import { ClipboardCopy } from "@components/shared"
import { ETHEREUM_NETWORK, POLYGON_NETWORK } from "@constant"
import { shortenAddress } from "@utils"

import { useDetailContext } from "../useDetail"

const dataBlockchain = [
  {
    name: "Ethereum",
    chainId: ETHEREUM_NETWORK,
  },
  {
    name: "Polygon",
    chainId: POLYGON_NETWORK,
  },
]

const ChainInfoContainer = () => {
  const { tokenDetails } = useDetailContext()
  return (
    <Box>
      <Text mb={4} fontWeight={600} color="grey.50">
        Chain info
      </Text>
      <Stack>
        <Flex align="center">
          <Text flex={1}>Contract Address</Text>
          <Flex flex={1} align="center">
            <Text color="cyan.600" isTruncated title={tokenDetails?.collection.id}>
              {shortenAddress(tokenDetails?.collection.id)}
            </Text>
            <ClipboardCopy ml={2} text={tokenDetails?.collection.id} />
          </Flex>
        </Flex>
        <Flex align="center">
          <Text flex={1}>Token Id</Text>
          <Text flex={1}>{tokenDetails?.tokenId}</Text>
        </Flex>
        <Flex align="center">
          <Text flex={1}>Token standard</Text>
          <Text flex={1}>{tokenDetails?.collection.collectionType}</Text>
        </Flex>
        <Flex align="center">
          <Text flex={1}>Blockchain</Text>
          <Text flex={1}>{dataBlockchain.find(item => item.chainId === tokenDetails?.chainId)?.name}</Text>
        </Flex>
      </Stack>
    </Box>
  )
}
export default ChainInfoContainer
