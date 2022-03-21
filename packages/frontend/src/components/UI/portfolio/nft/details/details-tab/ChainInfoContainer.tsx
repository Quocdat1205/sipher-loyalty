import { Box, Flex, Stack, Text } from "@sipher.dev/sipher-ui"

import { ClipboardCopy } from "@components/shared"
import { shortenAddress } from "@utils"

interface ChainProps {
  tokenId: string
  contractAddress: string
  tokenStandard: string
  blockChain: string
}

const ChainInfoContainer = ({ tokenId, contractAddress = "", tokenStandard, blockChain }: ChainProps) => {
  return (
    <Box>
      <Text mb={4} fontWeight={600} color="grey.50">
        Chain info
      </Text>
      <Stack>
        <Flex align="center">
          <Text flex={1}>Contract Address</Text>
          <Flex flex={1} align="center">
            <Text color="cyan.600" isTruncated title={contractAddress}>
              {shortenAddress(contractAddress)}
            </Text>
            <ClipboardCopy ml={2} text={contractAddress} />
          </Flex>
        </Flex>
        <Flex align="center">
          <Text flex={1}>Token Id</Text>
          <Text flex={1}>{tokenId}</Text>
        </Flex>
        <Flex align="center">
          <Text flex={1}>Token standard</Text>
          <Text flex={1}>{tokenStandard}</Text>
        </Flex>
        <Flex align="center">
          <Text flex={1}>Blockchain</Text>
          <Text flex={1}>{blockChain}</Text>
        </Flex>
      </Stack>
    </Box>
  )
}
export default ChainInfoContainer
