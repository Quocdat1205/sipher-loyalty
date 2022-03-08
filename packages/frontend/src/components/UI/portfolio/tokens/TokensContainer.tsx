import React from "react"
import { BsFillTriangleFill } from "react-icons/bs"
import { Box, chakra, Flex, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { currency } from "@utils"
import useSortableData from "src/hooks/useSortableData"

const header = [
  { id: "currency", name: "Currency" },
  { id: "balance", name: "Balance" },
  { id: "value", name: "Value" },
  { id: "change", name: "24H Change" },
] as const

const activityLog = [
  {
    currency: "ETH",
    name: "Sipher NEKO #7922",
    price: 0.027,
    priceInUSD: 200.23,
    from: "0xFD8FE238077684e0846db8FA31231231",
    to: "0xFD8FE238077684e0846db8FA434C5F6c0200003f",
    time: "3 months ago",
  },
  {
    currency: "SIPHER",
    name: "Sipher NEKO #7923",
    price: 0.05,
    priceInUSD: 900.23,
    from: "0xFD8FE238077684e0846db8FA434C5F6c0200003f",
    to: "0xFD8FE238077684e0846db8FA31231231",
    time: "3 months ago",
  },
]

export const TokensContainer = () => {
  const { items, requestSort, sortConfig } = useSortableData(activityLog)

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
                    {item.currency === "ETH" ? <EthereumIcon /> : <SipherIcon />}
                  </Box>
                  {item.currency}
                </Flex>
              </chakra.td>
              <chakra.td p={2}>{currency(item.price)}</chakra.td>
              <chakra.td p={2}>
                <Flex align="center">${currency(item.price)}</Flex>
              </chakra.td>
              <chakra.td p={2}>{currency(item.priceInUSD)}%</chakra.td>
            </chakra.tr>
          ))}
        </chakra.tbody>
      </chakra.table>
    </Box>
  )
}
