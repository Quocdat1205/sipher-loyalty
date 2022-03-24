import React from "react"
import Image from "next/image"
import { Box, Button, chakra, Flex, Text, Wrap, WrapItem } from "@sipher.dev/sipher-ui"

import { usePending } from "./usePending"

export const PendingContainer = () => {
  const { pendingData } = usePending()
  return (
    <Flex pos="relative" bgRepeat="no-repeat" bgSize="cover" flexDir="column" align="center">
      <Box py={6} zIndex={2} maxW="1200px" w="full" pb={8}>
        <Text fontSize="sm" textAlign="center" mb={4} color="grey.400">
          Items in this section are signed and ready to be minted. Successfully minted order and orders older than 3
          days will be automatically removed.
        </Text>
        <chakra.table w="full">
          <chakra.thead>
            <chakra.tr>
              <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                #
              </chakra.th>
              <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                Amount
              </chakra.th>
              <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                Status
              </chakra.th>
              <chakra.th w="20%" py={2}></chakra.th>
            </chakra.tr>
          </chakra.thead>
          <chakra.tbody>
            {pendingData?.map((item, index) => (
              <chakra.tr borderTop="1px" borderColor="whiteAlpha.100" key={item.id}>
                <chakra.td textAlign="center" py={4}>
                  {index + 1}
                </chakra.td>
                <chakra.td textAlign="center" py={4}>
                  <Wrap spacing={3} justify="center">
                    {item.info.map(i => (
                      <WrapItem key={i.id}>
                        <Flex align="center">
                          <Image src={i.image} alt={i.tokenId} width={40} height={40} />
                          <Text>x{i.quantity}</Text>
                        </Flex>
                      </WrapItem>
                    ))}
                  </Wrap>
                </chakra.td>
                <chakra.td textAlign="center" py={4}>
                  {item.status}
                </chakra.td>
                <chakra.td w="20%" textAlign="right" py={4}>
                  <Button
                    isLoading={item.isMinting}
                    onClick={() => {
                      item.batchIDs && item.batchIDs.length > 0 ? item.onMintBatch() : item.onMint()
                    }}
                  >
                    RE-MINT
                  </Button>
                  <Button ml={2} colorScheme="neutral" border="1px" borderColor="whiteAlpha.100" variant="secondary">
                    CANCEL
                  </Button>
                </chakra.td>
              </chakra.tr>
            ))}
          </chakra.tbody>
        </chakra.table>
      </Box>
    </Flex>
  )
}
