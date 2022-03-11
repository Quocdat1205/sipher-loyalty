import React, { useState } from "react"
import { Box, HStack } from "@sipher.dev/sipher-ui"

import FilterSelector from "../FilterSelector"
import GridSelector from "../GridSelector"

const categoriesSort = [
  { value: "characters", text: "Characters" },
  { value: "weapons", text: "Weapons" },
  { value: "accessories", text: "Accessories" },
  { value: "armor", text: "Armor" },
  { value: "other", text: "Other" },
]

const collectionSort = [
  { value: "NEKO", text: "SIPHER NEKO" },
  { value: "INU", text: "SIPHER INU" },
  { value: "SCULPTURE", text: "SIPHER Sculpture" },
]

const initFilter = {
  categories: "",
  collection: "",
}

const FilterBar = () => {
  const [filter, setFilter] = useState(initFilter)

  console.log(filter)

  return (
    <Box pt={[4, 0]}>
      <HStack display={["none", "flex"]} w="full" align="center" justify="flex-end">
        <FilterSelector
          onSelectChange={v => setFilter({ ...filter, collection: v })}
          text="Collection"
          data={collectionSort}
        />
        <FilterSelector
          onSelectChange={v => setFilter({ ...filter, categories: v })}
          text="Categories"
          data={categoriesSort}
        />
      </HStack>
      {/* <Stack spacing={[2, 4]} display={["flex", "none"]}>
        <HStack w="full" align="center" justify={["flex-start", "flex-end"]}>
          <FilterSelector title="Sorted by" isTruncated zIndex={4} w="full" text="Rarity" data={collectionSort} />
          <GridSelector />
        </HStack>
        <Flex>
          <FilterSelector text="Categories" w="full" data={categoriesSort} />
        </Flex>
      </Stack> */}
    </Box>
  )
}

export default FilterBar
