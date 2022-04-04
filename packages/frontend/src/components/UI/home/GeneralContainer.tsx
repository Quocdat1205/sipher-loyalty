import React, { useState } from "react"
import { Button, Flex, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon2, SipherIcon } from "@components/shared"
import { useBalanceContext } from "@hooks"
import { currency } from "@utils"

import CardGeneral from "./CardGeneral"
import { StakeModal } from "./modal"
import SipherPriceStatistics from "./SipherPriceStatistics"

interface GeneralContainerProps {
  totalPortfolioPrice: number
}

const GeneralContainer = ({ totalPortfolioPrice }: GeneralContainerProps) => {
  const [modalStake, setModalStake] = useState(false)
  const {
    dataPrice,
    balance: { sipher },
  } = useBalanceContext()

  const [isViewSipherInfo, setIsViewSipherInfo] = useState(false)

  return (
    <>
      <SipherPriceStatistics isOpen={isViewSipherInfo} onClose={() => setIsViewSipherInfo(false)} />
      <SimpleGrid mb={8} columns={[2, 2, 4]} spacing={6}>
        <CardGeneral
          value={`${currency(totalPortfolioPrice)} ETH`}
          name={"Portfolio Value"}
          icon={<EthereumIcon2 size="1.5rem" />}
          bottomChildren={
            <Text color="neutral.100">${currency(totalPortfolioPrice * (dataPrice?.ethereumPrice?.usd || 0))}</Text>
          }
        />
        <CardGeneral
          value={currency(sipher ?? 0)}
          name="SIPHER Token"
          icon={<SipherIcon size="1.5rem" />}
          onInfoClick={() => setIsViewSipherInfo(true)}
          // popoverProps={{ label: "SIPHER TOKEN", content: "Description" }}
          bottomChildren={
            <Flex justify="flex-end">
              <Button
                onClick={() => setModalStake(true)}
                _hover={{ bg: "accent.500", color: "neutral.900" }}
                bg="whiteAlpha.100"
                color="accent.500"
                rounded="md"
                px={3}
                py={1}
              >
                STAKE NOW
              </Button>
            </Flex>
          }
        />
      </SimpleGrid>
      <StakeModal isOpen={modalStake} onClose={() => setModalStake(false)} />
    </>
  )
}

export default GeneralContainer
