import React, { useState } from "react"
import { Box, chakra, Flex, FormControl, FormLabel, Img, Link, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, CustomInput, EthereumIcon, Form } from "@components/shared"

import { useDetailContext } from "../nft/details/useDetail"

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransferModal({ isOpen, onClose }: TransferModalProps) {
  const { tokenDetails, isFetched, collectionName } = useDetailContext()
  const [address, setAddress] = useState("")

  return (
    <ChakraModal title={"SHIPPING INFO"} isOpen={isOpen} onClose={onClose} size="2xl">
      <Box px={6}>
        <Flex align="center" mb="6">
          <Skeleton isLoaded={isFetched}>
            <Img rounded="lg" w="66px" h="80px" src={tokenDetails?.imageUrl} objectFit="cover" />
          </Skeleton>
          <Flex ml="6" direction="column">
            <Text fontSize="16px" fontWeight="600" mb="1">
              {tokenDetails?.name}
            </Text>
            <Text fontWeight="400" color="#93959C" mb="1">
              {collectionName}
            </Text>
            <Flex align="center" mb="1">
              <EthereumIcon mr={1} />
              <Text fontWeight="500" color="white">
                0.85 ETH
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Form>
          <FormControl as="fieldset" mb="6">
            <FormLabel>
              Wallet address<chakra.span color="red.500"> *</chakra.span>
            </FormLabel>
            <CustomInput />
          </FormControl>
        </Form>
        <Text color="neutral.400" mb="6">
          By clicking Transfer, I agree Sipher‘s <Link color="cyan.500">Term of Service</Link>
        </Text>
      </Box>
    </ChakraModal>
  )
}
