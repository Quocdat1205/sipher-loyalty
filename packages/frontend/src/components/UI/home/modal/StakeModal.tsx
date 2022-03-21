import React from "react"
import { Box, Button, chakra, Flex, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, SipherIcon } from "@components/shared"

import { useStake } from "./useStake"

interface ChooseAvatarModalProps {
  isOpen: boolean
  onClose: () => void
}

export const StakeModal = ({ isOpen, onClose }: ChooseAvatarModalProps) => {
  const { stakingPoolInfos } = useStake()

  return (
    <ChakraModal isCentered title={"STAKE TO EARN"} isOpen={isOpen} onClose={onClose} size="md">
      <Box px={6}>
        <chakra.table w="full">
          <chakra.thead>
            <chakra.tr>
              <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="left">
                Pool
              </chakra.th>
              {/* <chakra.th fontSize="sm" fontWeight={600} color="neutral.400" py={2} textAlign="center">
                APR
              </chakra.th> */}
              <chakra.th py={2}></chakra.th>
            </chakra.tr>
          </chakra.thead>
          <chakra.tbody>
            {stakingPoolInfos.map(pool => (
              <chakra.tr borderTop="1px" borderColor="neutral.600" key={pool.poolName}>
                <chakra.td py={4}>
                  <Flex align="center">
                    <SipherIcon size="2rem" />
                    <Text maxW="7rem" fontWeight={600} ml={2}>
                      {pool.poolName}
                    </Text>
                  </Flex>
                </chakra.td>
                {/* <chakra.td fontWeight={600} py={4} textAlign="center">
                  {(pool.APR * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                </chakra.td> */}
                <chakra.td textAlign="right" py={4}>
                  <Button onClick={pool.onStake}>STAKE</Button>
                </chakra.td>
              </chakra.tr>
            ))}
          </chakra.tbody>
        </chakra.table>
      </Box>
    </ChakraModal>
  )
}
