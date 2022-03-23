import React from "react"
import { Box, Flex, Heading, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { Lootbox } from "@sdk"

interface HeaderDetailsProps {
  details: Lootbox | undefined
  isFetching: boolean
}

export const HeaderDetails = ({ details, isFetching }: HeaderDetailsProps) => {
  return (
    <Box pr={4} borderBottom="1px" borderColor="whiteAlpha.100" pb={6}>
      <Skeleton mb={1} isLoaded={isFetching}>
        <Heading fontWeight={600} textTransform="uppercase">
          {details?.propertyLootbox.name}
        </Heading>
      </Skeleton>
      <Skeleton isLoaded={isFetching}>
        <Flex align="center" justify="space-between">
          <Text color="neutral.400" fontWeight={600}>
            Quantity: {details?.mintable}
          </Text>
          {/* <Text color="neutral.400" fontWeight={600}>
          Reveal Box in <chakra.span color="white">7D : 1H : 1M</chakra.span>
        </Text> */}
        </Flex>
      </Skeleton>
    </Box>
  )
}
