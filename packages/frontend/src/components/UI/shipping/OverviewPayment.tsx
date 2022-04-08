import React, { Fragment } from "react"
import { Divider, Text } from "@sipher.dev/sipher-ui"

const OverviewPayment = () => {
  return (
    <Fragment>
      <Text fontSize="xl" fontWeight={600}>
        OVERVIEW & PAYMENT
      </Text>
      <Divider pt={10} mb={6} borderColor="whiteAlpha.100" />
    </Fragment>
  )
}

export default OverviewPayment
