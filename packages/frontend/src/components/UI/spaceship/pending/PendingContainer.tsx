import React from "react"
import Image from "next/image"
import { Box, Button, chakra, Flex, Text } from "@sipher.dev/sipher-ui"

import { usePending } from "./usePending"

export const PendingContainer = () => {
  const { pendingData } = usePending()

  return (
    <Flex pos="relative" bgRepeat="no-repeat" bgSize="cover" flexDir="column" align="center">
      <Box py={6} zIndex={2} maxW="1200px" w="full" pb={8}>
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
              <chakra.th py={2}></chakra.th>
            </chakra.tr>
          </chakra.thead>
          <chakra.tbody>
            {pendingData?.map((item, index) => (
              <chakra.tr borderTop="1px" borderColor="whiteAlpha.100" key={item.id}>
                <chakra.td textAlign="center" py={4}>
                  {index + 1}
                </chakra.td>
                <chakra.td textAlign="center" py={4}>
                  <Flex justify="center">
                    {item.batchIDs.length > 0 ? (
                      item.batchIDs.map(item => (
                        <Flex align="center" key={item}>
                          <Image src="/images/spaceship/box-1.png" alt={item.toString()} width={40} height={40} />
                          <Text></Text>
                        </Flex>
                      ))
                    ) : (
                      <Image src="/images/spaceship/box-1.png" alt="box" width={40} height={40} />
                    )}
                  </Flex>
                </chakra.td>
                <chakra.td textAlign="center" py={4}>
                  {item.status}
                </chakra.td>
                <chakra.td textAlign="right" py={4}>
                  <Button
                    isLoading={item.isMinting}
                    onClick={() => {
                      item.batchIDs.length > 1 ? item.onMintBatch() : item.onMint()
                    }}
                  >
                    MINT
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
