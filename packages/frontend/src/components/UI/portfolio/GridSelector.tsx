import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs"
import { Box, HStack, IconButton } from "@sipher.dev/sipher-ui"

import { useGridSize } from "@hooks"

const GridSelector = () => {
  const gridSelections = useGridSize()

  return (
    <HStack spacing={1}>
      {gridSelections.map(size => (
        <Box key={size.key} bg="neutral.600" rounded="base">
          <IconButton
            boxSize="40px"
            aria-label={`${size.key} grid`}
            icon={size.key === "medium" ? <BsFillGridFill size="1.1rem" /> : <BsFillGrid3X3GapFill size="1.1rem" />}
            rounded="none"
            color={size.isActive ? "neutral.50" : "neutral.400"}
            bg="transparent"
            _active={{ bg: "none" }}
            _focus={{ boxShadow: "none" }}
            _hover={{ bg: "none" }}
            onClick={size.onSelect}
          />
        </Box>
      ))}
    </HStack>
  )
}

export default GridSelector
