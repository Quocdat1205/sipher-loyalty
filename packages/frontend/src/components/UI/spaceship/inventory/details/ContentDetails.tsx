import React from "react"
import { Box, Skeleton, Text } from "@sipher.dev/sipher-ui"

interface ContentDetailsProps {
  isFetching: boolean
}

export const ContentDetails = ({ isFetching }: ContentDetailsProps) => {
  return (
    <Box pr={4} py={6}>
      <Skeleton isLoaded={isFetching}>
        <Text mb={4} color="neutral.400">
          This acrobatic trickster feels right at home in the air.
        </Text>
        <Text mb={4} color="neutral.400">
          The FLIK FLAK is all about mobility. Pilots that fly this ship understand that it's very important to avoid
          getting touched. As long as you’re alive, you’re a threat.
        </Text>
        <Text color="neutral.400">
          Please be aware, once you “Confirm” below, your item(s) will be moved to the “Pending” section. If you decide
          to cancel, it will require an on-chain transaction and you will have to wait 3 days for the pending order to
          be canceled.
        </Text>
      </Skeleton>
    </Box>
  )
}
