import React from "react"
import { IconType } from "react-icons"
import { BsCheckCircleFill, BsThreeDots, BsX } from "react-icons/bs"
import { RiErrorWarningFill } from "react-icons/ri"
import { Box, Flex, Text, ToastOptions } from "@sipher.dev/sipher-ui"

interface ToastProps {
  status: ToastOptions["status"]
  title: string
  message?: string
  onClose: () => void
}

export const Toast = ({ status, title, message, onClose }: ToastProps) => {
  let background = ""
  let Icon: IconType

  switch (status) {
    case "success":
      background = "green.500"
      Icon = BsCheckCircleFill
      break
    case "error":
      background = "red.500"
      Icon = RiErrorWarningFill
      break
    case "warning":
      background = "yellow.500"
      Icon = BsThreeDots
      break
    default:
      background = "cyan.500"
      Icon = BsCheckCircleFill
  }

  return (
    <Box w="full" overflow="hidden" borderRadius="base" maxW="25rem">
      <Box bg="neutral.800" px={4} py={2}>
        <Flex align="center" justify="space-between">
          <Flex flex={1} align="center" justify="flex-start" color={background}>
            <Box rounded="full">
              <Icon size="1.25rem" />
            </Box>
            <Text fontWeight={600} ml={2}>
              {title}
            </Text>
          </Flex>
          <Box cursor="pointer" onClick={onClose} ml={2}>
            <BsX size="1.25rem" />
          </Box>
        </Flex>
        {message && (
          <Box mt={2}>
            <Text color="neutral.100" fontSize={"sm"}>
              {message}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
