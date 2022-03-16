import React from "react"
import { Checkbox, CheckboxProps } from "@sipher.dev/sipher-ui"

export const CustomCheckbox = ({ ...rest }: CheckboxProps) => {
  return (
    <Checkbox
      _hover={{ bg: "transparent", boxShadow: "none" }}
      sx={{
        ".chakra-checkbox__control": {
          border: "2px solid",
          borderRadius: "full",
          bg: "whiteAlpha.300",
          borderColor: "neutral.400",
          _focus: { boxShadow: "none" },
        },
        ".chakra-checkbox__control[data-checked]": {
          border: "none",
          color: "neutral.900",
          bg: "accent.500",
          _hover: { bg: "accent.500" },
        },
      }}
      border="none"
      size="lg"
      {...rest}
    />
  )
}
