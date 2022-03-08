import React from "react"
import { Image, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { currency } from "@utils"

import CardGeneral from "../home/CardGeneral"

const General = () => {
  return (
    <SimpleGrid mb={8} columns={[2, 4]} spacing={8}>
      <CardGeneral
        value={"23"}
        name={"Total NFTs"}
        icon={<Image src="/icons/coin1.png" h="1.3rem" />}
        rightChildren={
          <Text color="neutral.100">
            {currency(1.4)} ETH (${currency(23455)})
          </Text>
        }
      />
      <CardGeneral
        value={"12"}
        name={"Total Tokens"}
        icon={<Image src="/icons/coin.png" h="1.3rem" />}
        rightChildren={
          <Text color="neutral.100">
            {currency(1.4)} ETH (${currency(23455)})
          </Text>
        }
      />
      <CardGeneral
        value={"11"}
        name={"Total Sculptures"}
        icon={<Image src="/icons/coin2.png" h="1.3rem" />}
        rightChildren={
          <Text color="neutral.100">
            {currency(1.4)} ETH (${currency(23455)})
          </Text>
        }
      />
    </SimpleGrid>
  )
}

export default General
