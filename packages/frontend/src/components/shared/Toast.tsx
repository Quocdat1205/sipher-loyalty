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
    <Box w="full" overflow="hidden" borderRadius="base">
      <Box p={4} bg={background}>
        <Flex align="center" justify="space-between">
          <Flex flex={1} align="center" justify="flex-start">
            <Box color="white" rounded="full" p={0.5}>
              <Icon size="1.2rem" />
            </Box>
            <Text color="white" fontWeight={600} ml={2}>
              {title}
            </Text>
          </Flex>
          <Box cursor="pointer" onClick={onClose}>
            <BsX size="1.4rem" />
          </Box>
        </Flex>
        {message && (
          <Box pt={2}>
            <Text color="white">{message}</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
