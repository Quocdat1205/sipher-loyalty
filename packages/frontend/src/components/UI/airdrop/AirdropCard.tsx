import React from "react"
import Image from "next/image"
import { Box, Button, Text } from "@sipher.dev/sipher-ui"

import { useAirdrops } from "./useAirdrops"

interface AirdropProps {
  data: ReturnType<typeof useAirdrops>["allAirdrops"][number]
}

const AirdropCard = ({ data }: AirdropProps) => {
  return (
    <Box _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }} bg="neutral.700" rounded="lg">
      <Image src={data.imageUrl || ""} width={212} height={188} />
      <Box p={4}>
        <Text fontWeight={600}>$SIPHER TOKEN</Text>
        <Text mb={2} fontSize="xs" color="neutral.300">
          This Airdrop is limited and applied for Gold & Diamonđ tiers
        </Text>
        <Button w="full">CLAIM</Button>
      </Box>
    </Box>
  )
}

export default AirdropCard
