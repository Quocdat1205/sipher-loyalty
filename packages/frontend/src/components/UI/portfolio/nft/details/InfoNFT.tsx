import React from "react"
import { Avatar, Flex, HStack, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { NftContracts } from "@constant"
import { shortenAddress } from "@utils"

interface InfoNFTProps {
  user: any[] | undefined
  creator: string | undefined
  owner: string | undefined
  isFetched: boolean
  contractAddress: string
}

const InfoNFT = ({ user, owner, creator, isFetched, contractAddress }: InfoNFTProps) => {
  const collectionName = NftContracts.find(contract => contract.address === contractAddress)?.name

  return (
    <HStack mb={8} spacing={8}>
      <Flex align="center" flex={1} minW={0}>
        <Avatar bg="gray" />
        <Flex ml={2} flexDir="column" overflow="hidden" flex={1}>
          <Text pb={1} fontWeight={600} color="neutral.400">
            Creator
          </Text>
          <Skeleton isLoaded={isFetched}>
            <Text w="full" isTruncated>
              {user?.find(user => user.id === creator)?.name || shortenAddress(creator || "")}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
      <Flex align="center" flex={1} minW={0}>
        <Avatar bg="gray" />
        <Flex ml={2} flexDir="column">
          <Text pb={1} fontWeight={600} color="neutral.400">
            Owner
          </Text>
          <Skeleton isLoaded={isFetched}>
            <Text>{user?.find(user => user.id === owner)?.name || shortenAddress(owner || "")}</Text>
          </Skeleton>
        </Flex>
      </Flex>
      <Flex align="center" flex={1} minW={0}>
        <Avatar
          bg="gray"
          sx={{ img: { rounded: "none" } }}
          src="/images/collection/collection1.png"
          rounded="lg"
          boxShadow="rgba(255, 255, 255, 0.1) 4px 3px, rgba(255, 255, 255, 0.05) 8px 6px"
        />
        <Flex ml={4} flexDir="column">
          <Text pb={1} fontWeight={600} color="neutral.400">
            Collection
          </Text>
          <Skeleton isLoaded={isFetched}>
            <Text whiteSpace="nowrap">{collectionName}</Text>
          </Skeleton>
        </Flex>
      </Flex>
    </HStack>
  )
}
export default InfoNFT
