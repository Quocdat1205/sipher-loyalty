import React from "react"
import { Image, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { useBalanceContext } from "@hooks"
import { currency } from "@utils"

import CardGeneral from "../home/CardGeneral"

interface GeneralProps {
  totalCollectionPrice: number
  totalNFTs: number
  totalToken: number
  totalETHPrice: number
}

const General = ({ totalCollectionPrice, totalNFTs, totalToken, totalETHPrice }: GeneralProps) => {
  const {
    dataPrice: { ethereumPrice },
  } = useBalanceContext()

  return (
    <SimpleGrid mb={8} columns={[2, 2, 4]} spacing={8}>
      <CardGeneral
        value={totalNFTs.toString()}
        name={"Total NFTs"}
        icon={<Image src="/images/icons/coin1.png" h="1.3rem" />}
        bottomChildren={
          <Text color="neutral.100">
            {currency(totalCollectionPrice)} ETH (${currency(totalCollectionPrice * ethereumPrice.usd)})
          </Text>
        }
      />
      <CardGeneral
        value={totalToken.toString()}
        name={"Total Tokens"}
        icon={<Image src="/images/icons/coin.png" h="1.3rem" />}
        bottomChildren={
          <Text color="neutral.100">
            {currency(totalETHPrice)} ETH (${currency(totalETHPrice * ethereumPrice.usd)})
          </Text>
        }
      />
    </SimpleGrid>
  )
}

export default General
