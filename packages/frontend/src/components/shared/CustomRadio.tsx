import React from "react"
import { Box, Flex, RadioProps, useRadio } from "@sipher.dev/sipher-ui"

export const CustomRadio = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Flex cursor="pointer" align="center">
        <Box
          {...checkbox}
          pos="relative"
          border="2.5px solid"
          borderColor="neutral.400"
          _checked={{
            borderColor: "accent.600",
          }}
          _focus={{
            boxShadow: "none",
          }}
          boxSize={4}
          rounded="full"
          bg="transparent"
        >
          <Box
            {...checkbox}
            _checked={{
              bg: "accent.600",
            }}
            boxSize={1.5}
            rounded="full"
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
          />
        </Box>
        <Box ml={2}>{props.children}</Box>
      </Flex>
    </Box>
  )
}
