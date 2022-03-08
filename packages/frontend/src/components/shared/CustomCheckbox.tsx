import React from "react"
import { Checkbox, CheckboxProps } from "@sipher.dev/sipher-ui"

export const CustomCheckbox = ({ ...rest }: CheckboxProps) => {
  return (
    <Checkbox
      _hover={{ bg: "transparent", boxShadow: "none" }}
      sx={{
        ".chakra-checkbox__control": {
          border: "2px solid",
          borderRadius: "2px",
          borderColor: "neutral.400",
          _focus: { boxShadow: "none" },
        },
        ".chakra-checkbox__control[data-checked]": {
          border: "none",
          bg: "accent.500",
          color: "black",
          _hover: { bg: "accent.500" },
        },
      }}
      border="none"
      size="md"
      {...rest}
    />
  )
}
