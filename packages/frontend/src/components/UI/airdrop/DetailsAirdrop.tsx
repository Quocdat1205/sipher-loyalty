import React from "react"
import Image from "next/image"
import { Box, Button, Flex, HStack, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import { useDetailAirdrop } from "./useDetailAirdrop"

export function DetailsAirdrop() {
  const { isOpen, onClose } = useDetailAirdrop()

  return (
    <ChakraModal scrollBehavior="inside" title={""} isOpen={isOpen} onClose={onClose} size="4xl">
      <Flex minH="20rem" p={6} align="flex-start">
        <Skeleton>
          <Flex minH="20rem" rounded="lg" bg="black" align="center" justify="center" flex={1}>
            <Image
              quality={100}
              src="/images/airdrops/sipher.png"
              alt="airdrop"
              width={300}
              height={300}
              objectFit="contain"
            />
          </Flex>
        </Skeleton>
        <Flex flexDir="column" justify="space-between" minH="20rem" flex={2} ml={4}>
          <Stack spacing={4}>
            <Box>
              <Skeleton mb={1}>
                <Text fontWeight={600} fontSize="lg" color="neutral.100">
                  You are eligible for
                </Text>
              </Skeleton>
              <Skeleton>
                <Text fontWeight={600} fontSize="2xl">
                  $SIPHER Token(s) Airdrop
                </Text>
              </Skeleton>
            </Box>
            <Skeleton>
              <Text color="neutral.400">
                Over a 6 month Vesting Period with each month getting 395.16 $SIPHER starting on March 01 2022.
              </Text>
            </Skeleton>
            <Skeleton>
              <Text color="neutral.400">
                Please come back for your first Vested Airdrop of 395.16 $SIPHER on March 01 2022
              </Text>
            </Skeleton>
          </Stack>
          <HStack borderTop="1px" borderColor="whiteAlpha.300" pt={4}>
            <Skeleton flex={1}>
              <Button py={5} fontSize="md">
                Claim
              </Button>
            </Skeleton>
            <Skeleton flex={1}></Skeleton>
          </HStack>
        </Flex>
      </Flex>
    </ChakraModal>
  )
}
