import React from "react"
import { Box, Skeleton, Text } from "@sipher.dev/sipher-ui"

interface ContentDetailsProps {
  isFetching: boolean
}

export const ContentDetails = ({ isFetching }: ContentDetailsProps) => {
  return (
    <Box pr={4} py={6}>
      <Skeleton isLoaded={isFetching}>
        <Text color="neutral.400">
          For the first time ever, a Neko figurine is brought to you as a token of appreciation for the real MVP who
          participated in the NEKO Dutch Auction. Imprinted with a dystopian futuristic setting, this Sipher Neko
          Sculpture will be a totem of aesthetics that can make you a proud owner.
        </Text>
      </Skeleton>
    </Box>
  )
}
