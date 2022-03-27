import React from "react"
import { Box, Skeleton, Text } from "@sipher.dev/sipher-ui"

interface ContentDetailsProps {
  description: string
  isFetching: boolean
}

export const ContentDetails = ({ description = "", isFetching }: ContentDetailsProps) => {
  return (
    <Box pr={4} py={6}>
      <Skeleton isLoaded={isFetching}>
        <Text mb={4} color="neutral.400">
          {description}
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
