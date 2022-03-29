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
          On every adventure, The Wandering Alice grows more and more curious.
        </Text>
        <Text mb={4} color="neutral.400">
          Staying true to her name, The Wandering Alice roams through Sipheria to get her daily dose of expedition.
          Having a knack for discovering the unknown, she lives and breathes adventures since the beginning of time.
        </Text>
        <Text mb={4} color="neutral.400">
          In-game benefits are tied to exploration including chances to discover a new blueprint and bonus to players’
          dungeon earnings. The Wandering Alice can also bring back treasures or loot to players.
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
