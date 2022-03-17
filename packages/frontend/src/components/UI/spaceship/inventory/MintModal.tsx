import React from "react"
import Image from "next/image"
import { Box, Button, chakra, Divider, Flex, HStack, Link, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import QuantitySelector from "./details/QuantitySelector"

interface SettingAccountModalProps {
  isSuccess: boolean
  handleMint: () => void
  dataMint: Record<string, any>
  isOpen: boolean
  onClose: () => void
}

export const MintModal = ({
  dataMint = [],
  isOpen,
  onClose,
  isSuccess = false,
  handleMint,
}: SettingAccountModalProps) => {
  return (
    <ChakraModal
      scrollBehavior="inside"
      isCentered
      title={isSuccess ? "MINT SUCCESSFUL!" : "CONFIRMATION"}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <Box px={6}>
        {!isSuccess ? (
          <>
            <chakra.table w="full">
              <chakra.thead>
                <chakra.tr>
                  <chakra.th fontSize="sm" py={2} fontWeight={600} textAlign="left">
                    Item(s)
                  </chakra.th>
                  <chakra.th fontSize="sm" py={2} fontWeight={600} textAlign="right">
                    Quantity(s)
                  </chakra.th>
                </chakra.tr>
              </chakra.thead>
              <chakra.tbody>
                {dataMint.map(item => (
                  <chakra.tr borderTop="1px" borderColor="whiteAlpha.100" key={item.id}>
                    <chakra.td py={2}>
                      <Flex align="center">
                        <Image src={item.imageUrl} alt={item.name} width={46} height={46} />
                        <Text ml={4}>{item.name}</Text>
                      </Flex>
                    </chakra.td>
                    <chakra.td py={2}>
                      <QuantitySelector onChange={v => item.onChange(item.id, v)} maxValue={5} value={item.slot} />
                    </chakra.td>
                  </chakra.tr>
                ))}
              </chakra.tbody>
            </chakra.table>
            <Divider borderColor="whiteAlpha.100" mb={2} />
            <Flex mb={6} align="center" justify="space-between">
              <Text fontWeight={600}>SUM QTY(s)</Text>
              <Text fontWeight={600}>10</Text>
            </Flex>
            <Text color="grey.400">
              Minting Lootbox(es) to NFT(s) will be processed on Polygon and require you to change Blockchain network.
              For more information, please check{" "}
              <Link textDecor="underline" isExternal color="cyan.600">
                here.
              </Link>
            </Text>
          </>
        ) : (
          <Text color="grey.400">
            You have successfully minted 02 Lootbox Astero to NFT(s). Now you can list your NFT(s) on{" "}
            <Link textDecor="underline" isExternal color="cyan.600">
              Marketplace{" "}
            </Link>{" "}
            for trading.
          </Text>
        )}
        <Divider pt={4} borderColor="whiteAlpha.100" mb={6} />
        <HStack justify="center">
          {!isSuccess ? (
            <>
              <Button onClick={handleMint} fontSize="md" size="md" py={5}>
                MINT NFT
              </Button>
              <Button
                onClick={onClose}
                py={5}
                fontSize="md"
                size="md"
                colorScheme="neutral"
                border="1px"
                borderColor="neutral.600"
                variant="secondary"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" colorScheme="cyan" onClick={handleMint} fontSize="md" size="md" py={5}>
                VIEW YOUR NFT
              </Button>
              <Button onClick={onClose} py={5} fontSize="md" size="md">
                MINT ANOTHER NFT
              </Button>
            </>
          )}
        </HStack>
      </Box>
    </ChakraModal>
  )
}
