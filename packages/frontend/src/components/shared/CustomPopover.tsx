import React from "react"
import {
  Flex,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@sipher.dev/sipher-ui"

interface CustomPopoverProps {
  icon?: React.ReactElement
  children?: React.ReactNode
  label: string
  placement?: PlacementWithLogical | undefined
}

export const CustomPopover = ({ placement = "bottom-start", icon, children, label = "" }: CustomPopoverProps) => {
  return (
    <Popover arrowSize={8} placement={placement}>
      <PopoverTrigger>{icon}</PopoverTrigger>
      <PopoverContent
        _focus={{ boxShadow: "none", border: "none" }}
        rounded="lg"
        border="none"
        bg="accent.50"
        color="white"
        p={4}
      >
        <PopoverArrow bg="accent.50" />
        <Flex justify="space-between" align="center" pos="relative">
          <Text fontSize="sm" fontWeight={600} color="neutral.900">
            {label}
          </Text>
          <PopoverCloseButton pos="unset" bg="none" color="neutral.400" />
        </Flex>
        <PopoverBody p={0} mt={2}>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
