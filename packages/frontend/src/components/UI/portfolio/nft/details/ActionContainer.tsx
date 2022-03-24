import React, { useState } from "react"
import { ImPriceTag } from "react-icons/im"
import { Box, Button, chakra, HStack, Skeleton } from "@sipher.dev/sipher-ui"

import QuantitySelector from "./QuantitySelector"

interface ActionContainerProps {
  isFetched: boolean
}

const ActionContainer = ({ isFetched }: ActionContainerProps) => {
  const [slot, setSlot] = useState(0)
  return (
    <Box
      px={4}
      pos="sticky"
      bottom={0}
      bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(51, 52, 74, 0) 100%)"
      backdropFilter="blur(10px)"
      py={4}
      borderTop="1px"
      borderColor="neutral.600"
    >
      <HStack spacing={4}>
        <Skeleton isLoaded={isFetched} flex={1}>
          <QuantitySelector onChange={setSlot} maxValue={5} value={slot} />
        </Skeleton>
        <Skeleton isLoaded={isFetched} flex={1}>
          <Button
            py={5}
            colorScheme="accent"
            w="full"
            leftIcon={
              <chakra.span transform={"auto"} rotate={"-100deg"}>
                <ImPriceTag />
              </chakra.span>
            }
          >
            MINT NFT
          </Button>
        </Skeleton>
      </HStack>
    </Box>
  )
}
export default ActionContainer
