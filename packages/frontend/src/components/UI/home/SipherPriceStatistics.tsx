import { ReactNode } from "react"
import { BsFillTriangleFill } from "react-icons/bs"
import { Box, Divider, Flex, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"
import { useBalanceContext } from "@hooks"
import { currency } from "@utils"

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
  const {
    dataPrice: { sipherPrice },
  } = useBalanceContext()
  return (
    <ChakraModal title="SIPHER PRICE STATISTICS" isOpen={isOpen} onClose={onClose}>
      <Box px={6}>
        <StatisticRow
          name="SIPHER Price"
          value={`${currency(sipherPrice.eth, "", { minimumFractionDigits: 5 })} ETH (${currency(
            sipherPrice.usd,
            "$",
          )})`}
          additionalValue={
            <Flex color={sipherPrice.change < 0 ? "red.400" : "cyan.400"} align="center" justify={"flex-end"}>
              <Box transform="auto" rotate={sipherPrice.change < 0 ? "180deg" : "0deg"}>
                <BsFillTriangleFill size="0.65rem" />
              </Box>
              <Text fontWeight={600} ml={2}>
                {currency(Math.abs(sipherPrice.change))}%
              </Text>
              <Text color="neutral.300" ml={2}>
                24 HR
              </Text>
            </Flex>
          }
        />
        <StatisticRow
          name="Market Cap"
          value={currency(sipherPrice.marketcap, "$")}
          additionalValue={
            <Flex color="red.400" align="center" justify={"flex-end"}>
              <Box transform="auto" rotate={sipherPrice.marketcapChange < 0 ? "180deg" : "0deg"}>
                <BsFillTriangleFill size="0.65rem" />
              </Box>
              <Text fontWeight={600} ml={2}>
                {currency(Math.abs(sipherPrice.marketcapChange))}%
              </Text>
              <Text color="neutral.300" ml={2}>
                24 HR
              </Text>
            </Flex>
          }
        />
        <StatisticRow name="Fully Diluted Valuation" value={currency(sipherPrice.fullyDilutedValuation, "$")} />
        <StatisticRow name="Circulating Supply" value={currency(sipherPrice.circulatingSupply)} />
        <StatisticRow
          name="Max Supply"
          value={currency(sipherPrice.maxSupply!, "", { maximumFractionDigits: 0 })}
          haveDivider={false}
        />
      </Box>
    </ChakraModal>
  )
}

export default SipherPriceStatistics
