import React, { useState } from "react"
import { Button, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { currency } from "@utils"

import CardGeneral from "./CardGeneral"
import { StakeModal } from "./modal"

const GeneralContainer = () => {
  const [modalStake, setModalStake] = useState(false)

  return (
    <>
      <SimpleGrid mb={8} columns={[2, 4]} spacing={8}>
        <CardGeneral
          value={"1.34 ETH"}
          name={"Portfolio value"}
          icon={<EthereumIcon size="1.5rem" />}
          rightChildren={<Text color="neutral.100">${currency(23455)}</Text>}
        />
        <CardGeneral
          value="1,31"
          name="sipher token"
          icon={<SipherIcon />}
          popoverProps={{ label: "SIPHER TOKEN", content: "Description" }}
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
