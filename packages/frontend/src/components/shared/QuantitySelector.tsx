import React from "react"
import { TiMinus, TiPlus } from "react-icons/ti"
import { Flex, IconButton, Input, Text } from "@sipher.dev/sipher-ui"

interface QuantitySelectorProps {
  onChange: (newValue: number) => void
  value: number
  maxValue?: number
  minValue?: number
  isDisabled?: boolean
}

export const QuantitySelector = ({ onChange, value, maxValue, minValue = 1, isDisabled }: QuantitySelectorProps) => {
  return (
    <Flex
      justify="space-between"
      bg={maxValue === 0 ? "neutral.700" : "neutral.600"}
      border={maxValue === 0 ? "1px" : "0px"}
      borderColor="neutral.600"
      opacity={maxValue === 0 ? 0.5 : 1}
      py={1}
      px={4}
      rounded="base"
      overflow="hidden"
      align="center"
      h="40px"
      pointerEvents={maxValue === 0 ? "none" : "unset"}
    >
      <Flex flex={2} align="center" justify="space-between">
        <IconButton
          boxSize="24px"
          size="xs"
          aria-label="-"
          onClick={() => onChange(value - 1)}
          disabled={isDisabled || value === minValue}
          color="neutral.900"
          bg="neutral.200"
          icon={<TiMinus size="1rem" />}
          rounded="full"
        />
        <Input
          flex={1}
          variant="filled"
          bgColor="transparent"
          fontWeight={500}
          readOnly={true}
          rounded="0"
          _hover={{
            bgColor: "transparent",
          }}
          _focus={{
            shadow: "none",
          }}
          color="whiteAlpha.900"
          textAlign="center"
          value={`${value}/${maxValue}`}
          isDisabled={isDisabled}
          px={0}
          letterSpacing="1px"
        />
        <IconButton
          boxSize="24px"
          aria-label="+"
          size="xs"
          onClick={() => onChange(value + 1)}
          bg="neutral.200"
          color="neutral.900"
          disabled={isDisabled || value === maxValue}
          icon={<TiPlus size="1rem" />}
          rounded="full"
        />
      </Flex>
      {maxValue && (
        <Flex justify="center" flex={1}>
          <Text onClick={() => onChange(maxValue)} fontWeight={600} color="cyan.600" cursor="pointer">
            Max
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
