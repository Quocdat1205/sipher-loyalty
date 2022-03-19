import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import ChainInfoContainer from "./ChainInfoContainer"
import DescriptionContainer from "./DescriptionContainer"
import PropertiesContainer from "./PropertiesContainer"

interface DetailsTabProps {
  tokenId?: string
  contractAddress?: string
}

const DetailsTab = ({ tokenId, contractAddress }: DetailsTabProps) => {
  return (
    <Box overflow="hidden">
      <DescriptionContainer />
      <PropertiesContainer attributes={[]} />
      <ChainInfoContainer
        tokenId={tokenId ?? "0"}
        contractAddress={contractAddress ?? "0x000"}
        tokenStandard="ERC-721"
        blockChain="Ethereum"
      />
    </Box>
  )
}

export default DetailsTab
