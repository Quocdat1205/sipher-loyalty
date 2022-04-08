import React from "react"
import { Box, Stack } from "@sipher.dev/sipher-ui"

import { OrderCard } from "./OverviewPayment"

const ListOrder = () => {
  return (
    <Box
      overflow="auto"
      pos="relative"
      h="8rem"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Stack spacing={4}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </Stack>
    </Box>
  )
}
export default ListOrder
