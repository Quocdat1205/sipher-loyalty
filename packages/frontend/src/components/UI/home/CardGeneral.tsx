import React from "react"
import { MdInfo } from "react-icons/md"
import { Box, Flex, Text } from "@chakra-ui/react"

import { CustomPopover } from "@components/shared"

interface CardGeneralProps {
  value: string
  name: string
  icon: React.ReactNode
  popoverProps?: { label: string; content: string }
  rightChildren?: React.ReactNode
}

const CardGeneral = ({ value, name, icon, popoverProps, rightChildren }: CardGeneralProps) => {
  return (
    <Flex flexDir="column" justify="space-between" bg="blackAlpha.800" rounded="lg" w="full" p={6}>
      <Flex mb={4} align="center" justify="space-between">
        <Flex align="center">
          <Text color="neutral.300" textTransform="capitalize">
            {name}
          </Text>
          {popoverProps && (
            <CustomPopover
              label={popoverProps.label}
              icon={
                <Box ml={2} color="neutral.400">
                  <MdInfo size="1.2rem" />
                </Box>
              }
            >
              <Text color="neutral.900">{popoverProps.content}</Text>
            </CustomPopover>
          )}
        </Flex>
        <Flex align="center" justify="center" minW="2rem" h="2rem" bg="neutral.700" rounded="full">
          {icon}
        </Flex>
      </Flex>
      <Flex w="full" lineHeight={1} alignSelf="flex-end" align="flex-end" justify="space-between">
        <Text lineHeight={1} fontSize="3xl" color="text.primary" fontWeight={600}>
          {value}
        </Text>
        {rightChildren}
      </Flex>
    </Flex>
  )
}

export default CardGeneral
