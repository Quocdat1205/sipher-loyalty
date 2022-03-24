import React from "react"
import { Image, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { currency } from "@utils"

import CardGeneral from "../home/CardGeneral"

interface GeneralProps {
  totalNFTs: number
}

const General = ({ totalNFTs }: GeneralProps) => {
  return (
    <SimpleGrid mb={8} columns={[2, 4]} spacing={8}>
      <CardGeneral
        value={totalNFTs.toString()}
        name={"Total NFTs"}
        icon={<Image src="/images/icons/coin1.png" h="1.3rem" />}
      />
      <CardGeneral
        value={"2"}
        name={"Total Tokens"}
        icon={<Image src="/images/icons/coin.png" h="1.3rem" />}
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
