import React from "react"
import { Box, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { Lootbox } from "@sdk"

interface ContentDetailsProps {
  isFetching: boolean
  details: Lootbox | undefined
}

export const ContentDetails = ({ isFetching, details }: ContentDetailsProps) => {
  return (
    <Box pr={4} py={6}>
      <Skeleton isLoaded={isFetching}>
        <Text mb={4} color="neutral.400">
          {details?.propertyLootbox?.description}
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
