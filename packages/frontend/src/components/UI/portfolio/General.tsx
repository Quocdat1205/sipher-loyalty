import React from "react"
import { Image, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { currency } from "@utils"

import CardGeneral from "../home/CardGeneral"

interface GeneralProps {
  totalNFTs: number
  totalToken: number
  totalETHPrice: number
  totalUsdPrice: number
}

const General = ({ totalNFTs = 0, totalToken = 0, totalETHPrice = 0, totalUsdPrice = 0 }: GeneralProps) => {
  return (
    <SimpleGrid mb={8} columns={[2, 2, 4]} spacing={8}>
      <CardGeneral
        value={totalNFTs.toString()}
        name={"Total NFTs"}
        icon={<Image src="/images/icons/coin1.png" h="1.3rem" />}
      />
      <CardGeneral
        value={totalToken.toString()}
        name={"Total Tokens"}
        icon={<Image src="/images/icons/coin.png" h="1.3rem" />}
        bottomChildren={
          <Text color="neutral.100">
            {currency(totalETHPrice)} ETH (${currency(totalUsdPrice)})
          </Text>
        }
      />
    </SimpleGrid>
  )
}

export default General
