import React from "react"
import { Button, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { currency } from "@utils"

import CardGeneral from "./CardGeneral"

const GeneralContainer = () => {
  return (
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
          <Button _hover={{ bg: "accent.500", color: "neutral.900" }} bg="whiteAlpha.100" color="accent.500">
            STAKE NOW
          </Button>
        }
      />
      {/* <CardGeneral
        value="34/80"
        name="total xp"
        icon={
          <Flex px={2} align="center">
            <Text color="neutral.300" mr={2}>
              Bronze
            </Text>
            <Image src="/images/home/rank.png" alt="rank" h="1.4rem" />
          </Flex>
        }
        popoverProps={{ label: "SIPHER TOKEN", content: "Description" }}
      />
      <CardGeneral
        value="324"
        icon={<Image src="/images/home/nanochip.png" alt="nano" h="1.5rem" />}
        name="Total Nanochips"
      /> */}
    </SimpleGrid>
  )
}

export default GeneralContainer
