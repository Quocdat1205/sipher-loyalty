import React, { useState } from "react"
import { Button, chakra, Flex, HStack, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"
import { SpLayer } from "@components/shared/icons"
import QuantitySelector from "@components/UI/spaceship/inventory/details/QuantitySelector"
import { capitalize } from "@utils"

import { useDetailContext } from "../useDetail"

interface DetailLootboxProps {
  isOpen: boolean
  onClose: () => void
}

export function DetailLootbox({ isOpen, onClose }: DetailLootboxProps) {
  const { tokenDetails, isFetched, isLoadingBurn, slot, setSlot, router, handleMint, minable } = useDetailContext()
  const [imageLoad, setImageLoad] = useState(false)

  return (
    <ChakraModal scrollBehavior="inside" title={""} isOpen={isOpen} onClose={onClose} size="5xl">
      <Flex pt={6} px={8} minH="28rem" h="full" align="flex-start">
        <Skeleton flex={2} isLoaded={imageLoad && isFetched}>
          <Flex
            sx={{
              video: {
                width: 300,
                height: 300,
              },
            }}
            overflow="hidden"
            minH="26rem"
            rounded="lg"
            bg="black"
            align="center"
            justify="center"
            pos="relative"
            role="group"
          >
            <Flex
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              align="center"
              py={0.5}
              px={1.5}
              rounded="full"
              bg="white"
              pos="absolute"
              bottom="1rem"
              left="0.5rem"
            >
              <SpLayer />
              <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
                {tokenDetails?.value}
              </Text>
            </Flex>
            <Skeleton
              bg="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              pos="relative"
              overflow="hidden"
              h="14rem"
              w="full"
              isLoaded={isFetched}
            >
              <video src={tokenDetails?.imageUrl} autoPlay loop muted datatype="video/mp4"></video>
            </Skeleton>
          </Flex>
        </Skeleton>
        <Flex minH="26rem" flexDir="column" justify="space-between" flex={3} ml={6}>
          <Stack spacing={4}>
            <Skeleton isLoaded={isFetched}>
              <Text fontWeight={600} fontSize="3xl">
                {capitalize(tokenDetails?.name.toLowerCase() ?? "")}
              </Text>
            </Skeleton>
            <Skeleton isLoaded={isFetched}>
              <Stack spacing={2}>
                <Text color="neutral.400" fontWeight={600}>
                  You are having{" "}
                  <chakra.span color="white">
                    {tokenDetails?.quantity ?? 0} {capitalize(tokenDetails?.name.toLowerCase() ?? "")} NFTs
                  </chakra.span>
                </Text>
                <Text color="neutral.400">
                  Step required to burn Sipher {tokenDetails?.name} for the corresponding offchain Lootbox to open and
                  get the digital ship parts for building a whole spaceship to be used in game:
                </Text>
                <Text color="neutral.400">
                  1. Pay the gas fees to execute the burning transaction (Low fees! We are using Polygon network)
                </Text>
                <Text color="neutral.400">2. Approve the transaction that official burn this NFT</Text>
                <Text color="neutral.400">
                  3. You can check the offchain Lootbox{" "}
                  <chakra.span
                    onClick={() => router.push("/spaceship?tab=inventory")}
                    cursor="pointer"
                    color="cyan.600"
                  >
                    at the inventory tab under Spaceship page
                  </chakra.span>
                </Text>
              </Stack>
            </Skeleton>
          </Stack>
          <HStack borderTop="1px" borderColor="whiteAlpha.300" pt={4}>
            <Skeleton isLoaded={isFetched} flex={1}>
              <QuantitySelector value={slot} onChange={v => setSlot(v)} maxValue={minable ?? 0} />
            </Skeleton>
            <Skeleton isLoaded={isFetched} flex={1}>
              <Button
                isLoading={isLoadingBurn}
                onClick={handleMint}
                isDisabled={slot === 0}
                w="full"
                py={5}
                fontSize="md"
              >
                BRING TO OFF-CHAIN
              </Button>
            </Skeleton>
          </HStack>
        </Flex>
      </Flex>
    </ChakraModal>
  )
}
