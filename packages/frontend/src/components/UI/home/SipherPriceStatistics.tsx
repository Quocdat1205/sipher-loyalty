import { ReactNode } from "react"
import { BsFillTriangleFill } from "react-icons/bs"
import { Box, Divider, Flex, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

interface StatisticRowProps {
  name: string
  value: string
  additionalValue?: ReactNode
  haveDivider?: boolean
}

const StatisticRow = ({ name, value, additionalValue, haveDivider = true }: StatisticRowProps) => {
  return (
    <>
      <Flex justify="space-between">
        <Text color="neutral.100">{name}</Text>
        <Box>
          <Text fontWeight={600} color="neutral.100">
            {value}
          </Text>
          {additionalValue}
        </Box>
      </Flex>
      {haveDivider && <Divider my={4} />}
    </>
  )
}

interface SipherPriceStatisticsProps {
  isOpen: boolean
  onClose: () => void
}

const SipherPriceStatistics = ({ isOpen, onClose }: SipherPriceStatisticsProps) => {
  return (
    <ChakraModal title="Sipher Price Statistics" isOpen={isOpen} onClose={onClose}>
      <Box px={6}>
        <StatisticRow
          name="SIPHER Price"
          value="0.001 ETH (0.98$)"
          additionalValue={
            <Flex color="teal.400" align="center" justify={"flex-end"}>
              <BsFillTriangleFill size="0.65rem" />
              <Text fontWeight={600} ml={2}>
                0.89%
              </Text>
              <Text color="neutral.300" ml={2}>
                24 HR
              </Text>
            </Flex>
          }
        />
        <StatisticRow
          name="Market Cap"
          value="$26,771,586.94"
          additionalValue={
            <Flex color="red.400" align="center" justify={"flex-end"}>
              <BsFillTriangleFill size="0.65rem" />
              <Text fontWeight={600} ml={2}>
                0.89%
              </Text>
              <Text color="neutral.300" ml={2}>
                24 HR
              </Text>
            </Flex>
          }
        />
        <StatisticRow name="Fully Diluted Valuation" value="$669,289,673.50" />
        <StatisticRow name="Circulating Supply" value="40,000,000" />
        <StatisticRow name="Max Supply" value="1,000,000,000" haveDivider={false} />
      </Box>
    </ChakraModal>
  )
}

export default SipherPriceStatistics
