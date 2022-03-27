import React from "react"
import Image from "next/image"
import { Flex, Text } from "@sipher.dev/sipher-ui"

const NoItemUI = () => {
  return (
    <Flex minH="20rem" py={[8, 16]} flexDir="column" align="center" justify="center">
      <Image src="/images/chart.svg" height={60} width={60} alt="chart" />
      <Text mt={8} color="neutral.400">
        No items yet
      </Text>
    </Flex>
  )
}

export default NoItemUI
