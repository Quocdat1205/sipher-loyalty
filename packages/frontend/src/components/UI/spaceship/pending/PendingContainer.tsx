import React from "react"
import { format } from "date-fns"
import { Box, Button, chakra, Flex, Stack, Text, Wrap, WrapItem } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "@components/shared"
import NoItemUI from "@components/shared/NoItemUI"

import { usePending } from "./usePending"

export const PendingContainer = () => {
  const { pendingData } = usePending()

  return (
    <Flex pos="relative" bgRepeat="no-repeat" bgSize="cover" flexDir="column" align="center">
      <Box px={[4, 4, 4, 0, 0]} py={6} zIndex={2} maxW="1200px" w="full" pb={8}>
        <Text fontSize="sm" mb={4} color="neutral.400">
          Pending Lootboxes have been marked for minting or canceling minting. This request will take 3 days to process.
          You can initiate either request by clicking the a CANCEL button and it will require an on-chain transaction to
          execute. For Rejected items, you can click RE-MINT to mint them again.
        </Text>
        <Box bg="neutral.700" rounded="lg" p={4}>
          {pendingData.length > 0 ? (
            <chakra.table w="full">
              <chakra.thead>
                <chakra.tr>
                  <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                    #
                  </chakra.th>
                  <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                    ITEMS
                  </chakra.th>
                  <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                    STATUS
                  </chakra.th>
                  <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                    EXPIRES
                  </chakra.th>
                  <chakra.th w="20%" py={2}></chakra.th>
                </chakra.tr>
              </chakra.thead>
              <chakra.tbody>
                {pendingData?.map((item, index) => (
                  <chakra.tr borderTop="1px" borderColor="whiteAlpha.100" key={index}>
                    <chakra.td textAlign="center" py={4}>
                      {index + 1}
                    </chakra.td>
                    <chakra.td textAlign="center" py={4}>
                      <Wrap spacing={3} justify="center">
                        {item.info.map((i, idx) => (
                          <WrapItem key={idx}>
                            <CustomPopover
                              isTooltip
                              bg="neutral.600"
                              placement="top"
                              icon={
                                <Flex blendMode="lighten" sx={{ video: { h: "2rem" } }} align="center">
                                  <video src={i.image} autoPlay loop muted datatype="video/mp4"></video>
                                  <Text>x{i.quantity}</Text>
                                </Flex>
                              }
                            >
                              <Text fontSize="sm" color="white">
                                {i.name}
                              </Text>
                            </CustomPopover>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </chakra.td>
                    <chakra.td textAlign="center" py={4}>
                      {item.status}
                    </chakra.td>
                    <chakra.td textAlign="center" py={4}>
                      {format(new Date(item.deadline * 1000), "HH:mm - dd/MM/yyyy")}
                    </chakra.td>
                    <chakra.td w="20%" textAlign="right" py={4}>
                      <Stack direction={["column", "column", "row"]} align="center">
                        <Button
                          isLoading={item.status === "Minting" || item.isMinting}
                          isDisabled={item.status === "Minting" || item.isDisabled}
                          onClick={() => {
                            item.batchIDs && item.batchIDs.length > 0 ? item.onMintBatch() : item.onMint()
                          }}
                        >
                          RE-MINT
                        </Button>
                        <Button
                          onClick={item.onCancel}
                          isLoading={item.isCancel}
                          isDisabled={item.status === "Minting" || item.isDisabled}
                          colorScheme="neutral"
                          border="1px"
                          borderColor="whiteAlpha.100"
                          variant="secondary"
                        >
                          CANCEL
                        </Button>
                      </Stack>
                    </chakra.td>
                  </chakra.tr>
                ))}
              </chakra.tbody>
            </chakra.table>
          ) : (
            <NoItemUI />
          )}
        </Box>
      </Box>
    </Flex>
  )
}
