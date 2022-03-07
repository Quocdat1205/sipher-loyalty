import React, { useState } from "react"
import { Box, Flex, HStack, Stack } from "@sipher.dev/sipher-ui"

import FilterSelector from "./FilterSelector"
import GridSelector from "./GridSelector"

const categoriesSort = [
  { value: "characters", text: "Characters" },
  { value: "weapons", text: "Weapons" },
  { value: "accessories", text: "Accessories" },
  { value: "armor", text: "Armor" },
  { value: "other", text: "Other" },
]

const raritySort = [
  { value: "price", text: "Price: high to low" },
  { value: "cheapest", text: "Price: low to high" },
]

const statusSort = [
  { value: "sale", text: "On Sale" },
  { value: "auction", text: "On Auction" },
  { value: "bid", text: "Has Bid" },
  { value: "offer", text: "Has Offer" },
]

const initFilter = {
  categories: "",
  status: "",
  rarity: "",
}

const FilterBar = () => {
  const [filter, setFilter] = useState(initFilter)

  console.log(filter)

  return (
    <Box pt={[4, 0]}>
      <HStack display={["none", "flex"]} w="full" align="center" justify="flex-end">
        <FilterSelector
          onSelectChange={v => setFilter({ ...filter, categories: v })}
          text="Categories"
          data={categoriesSort}
        />
        <FilterSelector onSelectChange={v => setFilter({ ...filter, status: v })} text="Status" data={statusSort} />
        <FilterSelector
          title="Sorted by"
          onSelectChange={v => setFilter({ ...filter, rarity: v })}
          text="Rarity"
          data={raritySort}
        />
        <GridSelector />
      </HStack>
      <Stack spacing={[2, 4]} display={["flex", "none"]}>
        <HStack w="full" align="center" justify={["flex-start", "flex-end"]}>
          <FilterSelector isTruncated zIndex={4} w="full" text="Status" data={statusSort} />
          <FilterSelector title="Sorted by" isTruncated zIndex={4} w="full" text="Rarity" data={raritySort} />
          <GridSelector />
        </HStack>
        <Flex>
          <FilterSelector text="Categories" w="full" data={categoriesSort} />
        </Flex>
      </Stack>
    </Box>
  )
}

export default FilterBar
