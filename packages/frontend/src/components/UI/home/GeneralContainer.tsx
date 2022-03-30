import React, { useState } from "react"
import { Button, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { useBalanceContext } from "@hooks"
import { currency } from "@utils"

import CardGeneral from "./CardGeneral"
import { StakeModal } from "./modal"

interface GeneralContainerProps {
  totalCollectionPrice: number
}

const GeneralContainer = ({ totalCollectionPrice }: GeneralContainerProps) => {
  const [modalStake, setModalStake] = useState(false)
  const {
    dataPrice,
    balance: { sipher },
  } = useBalanceContext()

  return (
    <>
      <SimpleGrid mb={8} columns={[2, 2, 3]} spacing={6}>
        <CardGeneral
          value={`${currency(totalCollectionPrice)} ETH`}
          name={"Portfolio value"}
          icon={<EthereumIcon size="1.5rem" />}
          rightChildren={
            <Text pb={0.5} lineHeight={1} color="neutral.100">
              ${currency(totalCollectionPrice * (dataPrice?.ethereumPrice?.usd || 0))}
            </Text>
          }
        />
        <CardGeneral
          value={currency(sipher ?? 0)}
          name="sipher token"
          icon={<SipherIcon />}
          // popoverProps={{ label: "SIPHER TOKEN", content: "Description" }}
          rightChildren={
            <Button
              onClick={() => setModalStake(true)}
              _hover={{ bg: "accent.500", color: "neutral.900" }}
              bg="whiteAlpha.100"
              color="accent.500"
            >
              STAKE NOW
            </Button>
          }
        />
      </SimpleGrid>
      <StakeModal isOpen={modalStake} onClose={() => setModalStake(false)} />
    </>
  )
}

export default GeneralContainer
