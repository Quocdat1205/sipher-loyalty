import React, { useState } from "react"
import { Avatar, Flex, HStack, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { NftContracts } from "@constant"
import { shortenAddress } from "@utils"

import { OwnersModal } from "../../modal"

import { useDetailContext } from "./useDetail"

interface InfoNFTProps {
  tokenDetails: ReturnType<typeof useDetailContext>["tokenDetails"]
  isFetched: boolean
}

const InfoNFT = ({ tokenDetails, isFetched }: InfoNFTProps) => {
  const collectionName = NftContracts.find(contract => contract.address === tokenDetails?.collection.id)?.name
  const [isModal, setIsModal] = useState(false)

  return (
    <HStack mb={8} spacing={8}>
      <Flex align="center" flex={1} minW={0}>
        <Avatar bg="gray" />
        <Flex ml={2} flexDir="column" overflow="hidden" flex={1}>
          <Text pb={1} fontWeight={600} color="neutral.400">
            Creator
          </Text>
          <Skeleton isLoaded={isFetched}>
            <Text color="cyan.600" w="full" isTruncated>
              Sipher
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
      <Flex align="center" flex={1} minW={0}>
        <Avatar bg="gray" />
        <Flex ml={2} flexDir="column">
          <Text pb={1} fontWeight={600} color="neutral.400">
            {tokenDetails?.collection.collectionType === "ERC1155" ? "Owner(s)" : "Owner"}
          </Text>
          <Skeleton color="cyan.600" isLoaded={isFetched}>
            {tokenDetails?.collection.collectionType === "ERC1155" ? (
              <Text onClick={() => setIsModal(true)} cursor="pointer" textDecor="underline">
                {tokenDetails?.allOwner.length}
              </Text>
            ) : (
              <Text>{shortenAddress(tokenDetails?.owner || "")}</Text>
            )}
          </Skeleton>
        </Flex>
        <OwnersModal ownersData={tokenDetails?.allOwner ?? []} isOpen={isModal} onClose={() => setIsModal(false)} />
      </Flex>
      <Flex align="center" flex={1} minW={0}>
        <Avatar
          bg="gray"
          sx={{ img: { rounded: "none" } }}
          src={tokenDetails?.collection.logoImage}
          overflow="hidden"
          rounded="lg"
          boxShadow="rgba(255, 255, 255, 0.1) 4px 3px, rgba(255, 255, 255, 0.05) 8px 6px"
        />
        <Flex ml={4} flexDir="column">
          <Text pb={1} fontWeight={600} color="neutral.400">
            Collection
          </Text>
          <Skeleton isLoaded={isFetched}>
            <Text color="cyan.600" whiteSpace="nowrap">
              {collectionName}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </HStack>
  )
}
export default InfoNFT
