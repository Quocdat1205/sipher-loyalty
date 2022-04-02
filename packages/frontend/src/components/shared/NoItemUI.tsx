import React from "react"
import { Flex, Img, Text } from "@sipher.dev/sipher-ui"

const NoItemUI = () => {
  return (
    <Flex minH="20rem" py={[8, 16]} flexDir="column" align="center" justify="center">
      <Img src="/images/chart.svg" boxSize="60px" alt="chart" />
      <Text mt={8} color="neutral.400">
        No items yet
      </Text>
    </Flex>
  )
}

export default NoItemUI
