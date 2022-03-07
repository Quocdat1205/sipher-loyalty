import { useEffect, useRef, useState } from "react"
import { BiChevronUp } from "react-icons/bi"
import { Box, BoxProps, Collapse, Flex, Stack, Text, useOutsideClick } from "@sipher.dev/sipher-ui"

import useNftFilter from "../../../hooks/useNftFilter"

interface FilterSelectorProps extends BoxProps {
  title?: string
  placement?: "left" | "right"
  isTruncated?: boolean
  text?: string
  data: { value: string; text: string }[]
  onSelectChange?: (v: string) => void
}

const FilterSelector = ({
  placement = "left",
  isTruncated = false,
  onSelectChange,
  text,
  data,
  ...rest
}: FilterSelectorProps) => {
  const { currentFilter, filterSelection, currentFilterText } = useNftFilter({
    data,
  })
  const position = placement === "left" ? { left: "0", right: "0" } : { right: "0", left: "unset" }

  const [isOpen, setIsOpen] = useState(false)

  const boxRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: boxRef,
    handler: () => setIsOpen(false),
  })

  useEffect(() => {
    onSelectChange && onSelectChange(currentFilter)
  }, [currentFilter])

  return (
    <Box
      minW={["8 rem", "10rem"]}
      pos="relative"
      cursor="pointer"
      onClick={() => setIsOpen(!isOpen)}
      ref={boxRef}
      zIndex={2}
      {...rest}
    >
      <Box
        p={2}
        rounded="base"
        background={isOpen ? "accent.600" : "neutral.600"}
        userSelect="none"
        transition="background-color 0.2s ease-in-out"
      >
        <Flex align="center" justify="space-between">
          <Text
            textAlign="left"
            color={isOpen ? "neutral.900" : "neutral.50"}
            maxWidth={isTruncated ? ["8rem", "10rem"] : "auto"}
            mr={4}
            isTruncated={isTruncated}
          >
            {!currentFilterText ? text : currentFilterText}
          </Text>
          <Box transform="auto" rotate={!isOpen ? "180deg" : "0deg"} color={isOpen ? "neutral.900" : "neutral.50"}>
            <BiChevronUp size="1.5rem" />
          </Box>
        </Flex>
      </Box>
      <Box
        pos="absolute"
        top="100%"
        transform="translateY(0.5rem)"
        left={[position.left, position.left]}
        right={[position.right, position.right]}
        w="full"
        minW="13rem"
        boxShadow={"0px 34px 60px 0px #00000099"}
      >
        <Collapse in={isOpen}>
          <Box pos="relative" rounded="base" bg="neutral.700" py={2}>
            <Stack px={2}>
              {filterSelection.map((sortSelection: Record<string, any>) => (
                <Box
                  key={sortSelection.value}
                  py={2}
                  px={4}
                  color={sortSelection.value === currentFilter ? "neutral.900" : "neutral.50"}
                  _hover={{
                    bg: "accent.600",
                    color: "neutral.900",
                  }}
                  background={sortSelection.value === currentFilter ? "accent.600" : "transparent"}
                  cursor="pointer"
                  onClick={sortSelection.onSelect}
                  rounded="base"
                >
                  <Text>{sortSelection.text}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default FilterSelector
