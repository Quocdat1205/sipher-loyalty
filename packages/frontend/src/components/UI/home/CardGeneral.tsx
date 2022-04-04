import React from "react"
import { MdInfo } from "react-icons/md"
import { Box, Flex, Text } from "@chakra-ui/react"

interface CardGeneralProps {
  value: string
  name: string
  icon: React.ReactNode
  onInfoClick?: () => void
  bottomChildren?: React.ReactNode
}

const CardGeneral = ({ value, name, icon, onInfoClick, bottomChildren }: CardGeneralProps) => {
  return (
    <Flex flexDir="column" bg="blackAlpha.800" rounded="lg" w="full" p={3}>
      <Flex mb={0} align="center" justify="space-between" px={1}>
        <Flex align="center">
          <Text color="neutral.300">{name}</Text>
          {onInfoClick && (
            <Box ml={2} color="neutral.400" cursor={"pointer"} onClick={onInfoClick}>
              <MdInfo size="1.2rem" />
            </Box>
          )}
        </Flex>
        <Flex align="center" justify="center" boxSize="2.25rem" bg="neutral.700" rounded="full">
          {icon}
        </Flex>
      </Flex>
      <Flex w="full" flexDir="column" pl={1}>
        <Text mb={0} fontSize="3xl" color="text.primary" fontWeight={600}>
          {value}
        </Text>
        <Box>{bottomChildren}</Box>
      </Flex>
    </Flex>
  )
}

export default CardGeneral
