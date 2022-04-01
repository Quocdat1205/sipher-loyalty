import React from "react"
import { Box, HStack } from "@sipher.dev/sipher-ui"

import FilterSelector from "../FilterSelector"
import { categoriesSort } from "../usePortfolio"

interface FilterBarProps {
  setFilter: (filter: string) => void
}

const FilterBar = ({ setFilter }: FilterBarProps) => {
  return (
    <Box pt={[4, 0]}>
      <HStack display={["none", "flex"]} w="full" align="center" justify="flex-end">
        {/* <FilterSelector
          onSelectChange={v => setFilter({ ...filter, collection: v })}
          text="Collection"
          data={collectionSort}
        /> */}
        <FilterSelector onSelectChange={v => setFilter(v)} text="Categories" data={categoriesSort} />
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
