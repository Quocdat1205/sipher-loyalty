import React from "react"
import { Box, chakra, Text } from "@sipher.dev/sipher-ui"

const DescriptionContainer = () => {
  return (
    <Box mb={4}>
      <Text mb={4} fontWeight={600} color="grey.50">
        Description
      </Text>
      <Text color="neutral.400">
        Created by <chakra.span color="cyan.600">Sipher-Mad-Scientist</chakra.span>
      </Text>
    </Box>
  )
}
export default DescriptionContainer
