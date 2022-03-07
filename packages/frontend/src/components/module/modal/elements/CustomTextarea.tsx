import React from "react"
import { Textarea } from "@sipher.dev/sipher-ui"

interface CustomTextareaProps {
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  placeholder?: string
  maxLength?: number
}
export function CustomTextarea({
  value,
  onChange,
  onFocus,
  placeholder,
  maxLength,
}: CustomTextareaProps) {
  return (
    <Textarea
      resize="none"
      h="10rem"
      bg="neutral.600"
      variant="filled"
      rounded="base"
      py={2}
      _focus={{ bg: "neutral.600" }}
      fontWeight={400}
      border="none"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={onFocus}
      maxLength={maxLength}
    />
  )
}
