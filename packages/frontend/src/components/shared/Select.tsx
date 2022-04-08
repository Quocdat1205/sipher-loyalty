// Simpler version of ComboBox, no search, and only select 1 item
import { FC, useEffect, useRef, useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { Box, chakra, Collapse, Flex, Input, Text, useDisclosure, useOutsideClick } from "@sipher.dev/sipher-ui"

interface Option {
  code?: string | number
  [key: string]: any
}
interface SelectProps {
  name: string
  selection: Option[]
  value: Option | null | undefined
  onSelect?: (option: Option) => void
  displayField?: string
  keyField?: string
  removable?: boolean
  readOnly?: boolean
  searchable?: boolean
  isDisabled?: boolean
}
export const Select: FC<SelectProps> = ({
  name,
  selection,
  value = null,
  onSelect = () => console.log(),
  displayField = "name",
  keyField = "id",
  removable = false,
  readOnly = false,
  searchable = false,
  isDisabled = false,
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: ref,
    handler: onClose,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState("")
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])
  const isOptionSelected = (option: Option) => value && option[keyField] === value[keyField]
  const handleSelect = (option: Option) => {
    if (isOptionSelected(option)) {
      if (removable) {
        onSelect({ id: "" })
      }
      onClose()
      return
    }
    onSelect(option)
    onClose()
  }
  const formatOption = (opt: Option) =>
    Object.values(opt)
      .map(value => {
        if (typeof value !== "string") return value.toString().toLowerCase()
        else return value.toLowerCase()
      })
      .join(" ")
  const selectionFilterer = (opt: Option) => formatOption(opt).includes(searchText.toLowerCase())
  useEffect(() => {
    if (!isOpen) setSearchText("")
  }, [isOpen])
  return (
    <Box pos="relative" ref={ref} cursor={isDisabled ? "not-allowed" : "auto"}>
      <Flex
        onClick={() => !isDisabled && onToggle()}
        align="center"
        px={4}
        h="full"
        pointerEvents={readOnly || isDisabled ? "none" : "all"}
        bg={isDisabled ? "neutral.700" : "neutral.600"}
        opacity={isDisabled ? 0.6 : 1}
        rounded="md"
        border={"1px"}
        cursor="pointer"
        borderColor={isDisabled ? "neutral.600" : "transparent"}
        height="3rem"
      >
        <Box flex={1} userSelect="none">
          <chakra.label
            color="neutral.400"
            pos="absolute"
            bottom={"0%"}
            left={0}
            w="full"
            h="full"
            pointerEvents={"none"}
            translateY={isOpen || value ? "-8px" : "0px"}
          >
            <chakra.span
              fontSize={isOpen || value ? "xs" : "md"}
              pos="absolute"
              left={"1rem"}
              top="0.8rem"
              transform={"auto"}
              transition="all 0.25s ease-out"
            >
              {name}
            </chakra.span>
          </chakra.label>
          <Text pt={3} color={value ? "white" : "neutral.400"} isTruncated>
            {value && value[displayField]}
          </Text>
        </Box>
        {!readOnly && (
          <Box color="neutral.400">{isOpen ? <BiChevronUp size="1.2rem" /> : <BiChevronDown size="1.2rem" />}</Box>
        )}
      </Flex>
      <Box
        pos="absolute"
        overflow="visible"
        width="100%"
        zIndex="dropdown"
        top={"100%"}
        transform={"translateY(0.5rem);"}
      >
        <Collapse in={isOpen} animateOpacity unmountOnExit>
          <Flex
            direction="column"
            width="100%"
            bg="neutral.600"
            rounded="md"
            boxShadow={"0px 7px 15px #00000099"}
            py={1}
            border="1px"
            borderColor="whiteAlpha.100"
          >
            {searchable && (
              <Input
                color="white"
                _focus={{ borderColor: "none" }}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                ref={inputRef}
                variant="flushed"
                mb={1}
                placeholder="Search..."
                px={4}
              />
            )}
            <Box flex={1} overflow="overlay" maxH="10rem">
              {selection.filter(selectionFilterer).map(option => (
                <Box
                  key={option[keyField]}
                  cursor="pointer"
                  onClick={() => handleSelect(option)}
                  px={4}
                  py={2}
                  _hover={{
                    bg: isOptionSelected(option) ? "neutral.500" : "neutral.500",
                  }}
                  bg={isOptionSelected(option) ? "neutral.500" : "transparent"}
                  color={isOptionSelected(option) ? "white" : "white"}
                  fontWeight={isOptionSelected(option) ? "semibold" : "normal"}
                >
                  {option[displayField]}
                </Box>
              ))}
            </Box>
          </Flex>
        </Collapse>
      </Box>
    </Box>
  )
}
