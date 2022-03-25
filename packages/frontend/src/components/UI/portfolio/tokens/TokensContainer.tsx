import React from "react"
import { BsFillTriangleFill } from "react-icons/bs"
import { Box, chakra, Flex, Text } from "@sipher.dev/sipher-ui"

import { currency } from "@utils"
import useSortableData from "src/hooks/useSortableData"

import usePortfolio from "../usePortfolio"

const header = [
  { id: "currency", name: "Currency" },
  { id: "balance", name: "Balance" },
  { id: "value", name: "Value" },
  { id: "change", name: "24H Change" },
] as const

interface TokensContainerProps {
  dataTokens: ReturnType<typeof usePortfolio>["dataTokens"]
}

const TokensContainer = ({ dataTokens = [] }: TokensContainerProps) => {
  const { items, requestSort, sortConfig } = useSortableData(dataTokens)

  return (
    <Box bg="neutral.700" p={4} rounded="lg" overflowX="auto" whiteSpace="nowrap">
      <chakra.table w="full">
        <chakra.thead>
          <chakra.tr>
            {header.map(i => (
              <chakra.th key={i.id} p={2} textAlign={"left"}>
                <Flex align="center">
                  <Text textTransform="uppercase" fontSize="sm" mr={2} fontWeight={600} color={"neutral.400"}>
                    {i.name}
                  </Text>
                  <Box
                    color="neutral.400"
                    transform={"auto"}
                    cursor="pointer"
                    onClick={() => requestSort(i.id)}
                    rotate={
                      sortConfig?.key === i.id ? (sortConfig.direction === "ascending" ? "0deg" : "180deg") : "180deg"
                    }
                  >
                    <BsFillTriangleFill size={"0.5rem"} />
                  </Box>
                </Flex>
              </chakra.th>
            ))}
          </chakra.tr>
        </chakra.thead>
        <chakra.tbody>
          {items.map((item, index) => (
            <chakra.tr key={index} borderTop="1px" borderColor="neutral.600">
              <chakra.td p={2}>
                <Flex align="center">
                  <Box color="neutral.400" transform="auto" overflow="hidden" rounded="base" mr={2}>
                    {item.icon}
                  </Box>
                  {item.currency}
                </Flex>
              </chakra.td>
              <chakra.td p={2}>{currency(item.balance)}</chakra.td>
              <chakra.td p={2}>
                <Flex align="center">${currency(item.value || 0)}</Flex>
              </chakra.td>
              <chakra.td p={2}>{currency(item.change)}%</chakra.td>
            </chakra.tr>
          ))}
        </chakra.tbody>
      </chakra.table>
    </Box>
  )
}
export default TokensContainer
