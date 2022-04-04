import React from "react"
import { Box, Flex, Heading, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { Metadata } from "@components/shared"
import { Lootbox } from "@sdk"
import { capitalize } from "@utils"

interface HeaderDetailsProps {
  details: Lootbox | undefined
  isFetched: boolean
}

export const HeaderDetails = ({ details, isFetched }: HeaderDetailsProps) => {
  return (
    <>
      <Metadata
        title={
          isFetched
            ? `${capitalize(details!.propertyLootbox.name.toLowerCase() || "")} | Sipher Dashboard`
            : "Loading... | Sipher Dashboard"
        }
        description=""
      />
      <Box pr={4} borderBottom="1px" borderColor="whiteAlpha.100" pb={6}>
        <Skeleton mb={1} isLoaded={isFetched}>
          <Heading fontWeight={600} textTransform="uppercase">
            {details?.propertyLootbox.name}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={isFetched}>
          <Flex align="center" justify="space-between">
            <Text color="neutral.400" fontWeight={600}>
              Quantity: {details?.mintable}
            </Text>
          </Flex>
        </Skeleton>
      </Box>
    </>
  )
}
