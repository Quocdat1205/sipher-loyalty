import React from "react"
import { ImPriceTag } from "react-icons/im"
import { Box, Button, chakra, HStack, Skeleton } from "@sipher.dev/sipher-ui"

import { Lootbox } from "@sdk"

import QuantitySelector from "./QuantitySelector"

interface ActionContainerProps {
  isFetching: boolean
  details: Lootbox | undefined
  slot: number
  setSlot: (v: number) => void
  mutateMint: () => void
  isLoading: boolean
}

export const ActionContainer = ({
  details,
  slot,
  setSlot,
  isLoading,
  mutateMint,
  isFetching,
}: ActionContainerProps) => {
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
        <Skeleton isLoaded={isFetching} flex={1}>
          <QuantitySelector onChange={setSlot} maxValue={details?.mintable ?? 0} value={slot} />
        </Skeleton>
        <Skeleton isLoaded={isFetching} flex={1}>
          <Button
            isDisabled={slot === 0}
            onClick={() => mutateMint()}
            isLoading={isLoading}
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
