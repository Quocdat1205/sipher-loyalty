import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Text } from "@sipher.dev/sipher-ui"

import { useAirdrops } from "./useAirdrops"

interface AirdropProps {
  data: ReturnType<typeof useAirdrops>["allAirdrops"][number]
}

const AirdropCard = ({ data }: AirdropProps) => {
  return (
    <Flex
      flexDir="column"
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      bg="neutral.700"
      rounded="lg"
    >
      <Image src={data.imageUrl || "/images/airdrops/sipher.png"} width={212} height={188} />
      <Flex flexDir="column" flex={1} p={4}>
        <Box flex={1}>
          <Text fontWeight={600}>{data.name}</Text>
          <Text mb={2} fontSize="xs" color="neutral.300">
            {data.description}
          </Text>
        </Box>
        <Button onClick={data.onClaim} isLoading={data.isClaiming} isDisabled={data.isDisabled} w="full">
          CLAIM
        </Button>
      </Flex>
    </Flex>
  )
}

export default AirdropCard
