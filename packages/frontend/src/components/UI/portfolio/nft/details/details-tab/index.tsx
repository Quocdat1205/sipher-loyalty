import React from "react"
import { Box } from "@sipher.dev/sipher-ui"

import ChainInfoContainer from "./ChainInfoContainer"
import DescriptionContainer from "./DescriptionContainer"
import PropertiesContainer from "./PropertiesContainer"

const DetailsTab = () => {
  return (
    <Box overflow="hidden">
      <DescriptionContainer />
      <PropertiesContainer />
      <ChainInfoContainer />
    </Box>
  )
}

export default DetailsTab
