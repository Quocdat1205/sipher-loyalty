import React, { Fragment } from "react"
import { BiTrash } from "react-icons/bi"
import { Box, Divider, Flex, Img, Stack, Text } from "@sipher.dev/sipher-ui"

import { QuantitySelector } from "@components/shared"

const OrderCard = () => {
  return (
    <Flex align="center" justify="space-betweens">
      <Flex align="center" flex={1}>
        <Img rounded="lg" src="/images/nft/sipher1.png" alt="sipher" h="3rem" />
        <Text ml={2} fontWeight={600}>
          SIPHER NEKO SCULPTURE
        </Text>
      </Flex>
      <Flex align="center">
        <Box maxW="8rem">
          <QuantitySelector size="small" value={1} maxValue={1} onChange={v => console.log(v)} isShowMax={false} />
        </Box>
        <Box ml={2} cursor="pointer" color="red.400">
          <BiTrash size="1.2rem" />
        </Box>
      </Flex>
    </Flex>
  )
}

const OverviewPayment = () => {
  return (
    <Fragment>
      <Text fontSize="xl" fontWeight={600}>
        OVERVIEW & PAYMENT
      </Text>
      <Divider pt={8} mb={6} borderColor="whiteAlpha.100" />
      <Flex mb={4} align="center" justify="space-between">
        <Text fontWeight={600}>YOUR ORDER No.: #AB321</Text>
        <Text fontWeight={600}>QTY:2</Text>
      </Flex>
      <Stack overflow="auto" h="8rem" pr={1} spacing={4}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </Stack>
      <Divider pt={6} mb={6} borderColor="whiteAlpha.100" />
      <Flex mb={4} align="center" justify="space-between">
        <Text fontWeight={600}>YOUR ORDER No.: #AB321</Text>
        <Text fontWeight={600}>QTY:2</Text>
      </Flex>
      <Stack overflow="auto" h="11rem" spacing={4}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </Stack>
      <Divider pt={6} mb={6} borderColor="whiteAlpha.100" />
      <Text mb={2} fontWeight={600}>
        SHIPPING FEE
      </Text>
      <Text color="neutral.200">
        Our customer service team will contact you via email for further information about shipping fee amount and
        payment method.
      </Text>
    </Fragment>
  )
}

export default OverviewPayment
