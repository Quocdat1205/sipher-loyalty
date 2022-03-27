import React, { Fragment } from "react"
import {
  Box,
  Flex,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from "@sipher.dev/sipher-ui"

interface CustomPopoverProps {
  icon?: React.ReactElement
  isTooltip?: boolean
  bg?: string
  color?: string
  children?: React.ReactNode
  label?: string
  placement?: PlacementWithLogical | undefined
}

const CustomLabel = ({ label, children }) => {
  return (
    <Box p={label ? 4 : 2}>
      {label && (
        <Flex justify="space-between" align="center" pos="relative">
          <Text fontSize="sm" fontWeight={600} color="neutral.900">
            {label}
          </Text>
        </Flex>
      )}
      <Box p={0} mt={label ? 2 : 0}>
        {children}
      </Box>
    </Box>
  )
}

export const CustomPopover = ({
  placement = "bottom-start",
  bg = "accent.50",
  icon,
  children,
  label,
  isTooltip = false,
}: CustomPopoverProps) => {
  return (
    <Fragment>
      {isTooltip ? (
        <Box display={isTooltip ? ["none", "block"] : ["block", "none"]}>
          <Tooltip
            placement={placement}
            overflow="hidden"
            rounded="lg"
            hasArrow
            label={<CustomLabel label={label} children={children} />}
            bg={bg}
          >
            {icon}
          </Tooltip>
        </Box>
      ) : (
        <Box display={isTooltip ? ["block", "none"] : ["none", "block"]}>
          <Popover arrowSize={8} placement={placement}>
            <PopoverTrigger>{icon}</PopoverTrigger>
            <PopoverContent _focus={{ boxShadow: "none", border: "none" }} rounded="lg" border="none" bg={bg} p={4}>
              <PopoverArrow bg={bg} />
              <Flex justify="space-between" align="center" pos="relative">
                <Text fontSize="sm" fontWeight={600} color={"neutral.900"}>
                  {label}
                </Text>
                <PopoverCloseButton pos="unset" bg="none" color="neutral.400" />
              </Flex>
              <PopoverBody p={0} mt={2}>
                {children}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Fragment>
  )
}
