import React from "react"
import { Input } from "@sipher.dev/sipher-ui"

interface CustomInputProps {
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  placeholder?: string
  maxLength?: number
}
export function CustomInput({
  value,
  onChange,
  onFocus,
  placeholder,
  maxLength,
}: CustomInputProps) {
  return (
    <Input
      bg="neutral.600"
      variant="filled"
      rounded="base"
      py={2}
      h="full"
      border="none"
      _focus={{ bg: "neutral.600" }}
      fontWeight={400}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={onFocus}
      maxLength={maxLength}
    />
  )
}
