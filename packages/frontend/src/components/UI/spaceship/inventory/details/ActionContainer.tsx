import React from "react"
import { ImPriceTag } from "react-icons/im"
import { Box, Button, chakra, HStack, Skeleton } from "@sipher.dev/sipher-ui"

import { Lootbox } from "@sdk"

import { MintModal } from "./MintModal"
import QuantitySelector from "./QuantitySelector"
import { DetailsBox } from "./useDetailBox"

interface ActionContainerProps {
  isFetching: boolean
  mintedData: DetailsBox | undefined
  details: Lootbox | undefined
  slot: number
  setSlot: (v: number) => void
  handleClick: () => void
  mutateMint: () => void
  isLoading: boolean
  status: string
  setStatus: (v: string) => void
}

export const ActionContainer = ({
  details,
  slot,
  setSlot,
  handleClick,
  isLoading,
  mutateMint,
  isFetching,
  mintedData,
  status,
  setStatus,
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
            onClick={handleClick}
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
      <MintModal
        details={details}
        mintedData={mintedData}
        isOpen={status !== ""}
        status={status}
        onClose={() => setStatus("")}
        slot={slot}
        handleMint={mutateMint}
        isLoading={isLoading}
      />
    </Box>
  )
}
