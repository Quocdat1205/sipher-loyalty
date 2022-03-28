import React from "react"
import { Avatar, Box, Flex, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"
import { Erc1155Owner } from "@sdk"
import { shortenAddress } from "@utils"

interface OwnersModalProps {
  ownersData: Erc1155Owner[]
  isOpen: boolean
  onClose: () => void
}

export function OwnersModal({ isOpen, onClose, ownersData }: OwnersModalProps) {
  return (
    <ChakraModal scrollBehavior="inside" title={"OWNED BY"} isOpen={isOpen} onClose={onClose} size="xl">
      <Stack spacing={4} align="center" mb="6">
        {ownersData?.map(item => (
          <Flex
            px={6}
            pt={4}
            borderTop="1px"
            borderColor="neutral.600"
            w="full"
            align="center"
            justify="space-between"
            key={item.publicAddress}
          >
            <Flex align="center">
              <Avatar bg="gray" />
              <Box ml={4}>
                <Text fontWeight={600}>Unnamed</Text>
                <Text>{shortenAddress(item.publicAddress)}</Text>
              </Box>
            </Flex>
            <Text fontWeight={600}>
              {item.totalOwned} {item.totalOwned > 2 ? "Items" : "Item"}
            </Text>
          </Flex>
        ))}
      </Stack>
    </ChakraModal>
  )
}
