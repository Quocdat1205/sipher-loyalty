import React, { useState } from "react"
import { IoIosWarning } from "react-icons/io"
import { Box, Flex, Text } from "@sipher.dev/sipher-ui"

import { SpCloseArrowLeft } from "./icons"

interface WarningUIProps {
  text?: string
}

export const WarningUI = ({
  text = " Minting Lootboxes, Ship parts, Spaceships to NFTs will be processed on Polygon and require you to change Blockchain network as well as have MATIC for paying gas fee.",
}: WarningUIProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Flex w="full">
      {isOpen ? (
        <Flex
          transition="0.3s all"
          align="center"
          justify="center"
          p={2}
          textAlign="center"
          w="full"
          pos="absolute"
          top="0"
          zIndex={2}
          bg="whiteAlpha.200"
        >
          <Box color="white">
            <IoIosWarning size="1.2rem" />
          </Box>
          <Text isTruncated mx={2} fontSize="sm" color="white">
            {text}
          </Text>
          <Box cursor="pointer" onClick={() => setIsOpen(false)}>
            <SpCloseArrowLeft />
          </Box>
        </Flex>
      ) : (
        <Flex
          transition="0.3s all"
          align="center"
          justify="center"
          p={2}
          textAlign="center"
          w={isOpen ? "full" : "5rem"}
          borderRightRadius="full"
          pos="absolute"
          top="0"
          zIndex={2}
          bg="whiteAlpha.200"
        >
          <Box color="white">
            <IoIosWarning size="1.2rem" />
          </Box>
          <Box transform="auto" rotate="180deg" cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
            <SpCloseArrowLeft viewBox="5 1 10 20" size="1.2rem" />
          </Box>
        </Flex>
      )}
    </Flex>
  )
}
