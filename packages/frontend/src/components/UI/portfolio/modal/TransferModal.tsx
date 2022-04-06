import React, { MouseEvent, useEffect, useState } from "react"
import { MdAccountBalanceWallet } from "react-icons/md"
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Img,
  InputGroup,
  InputRightElement,
  Link,
  Skeleton,
  Text,
} from "@sipher.dev/sipher-ui"

import { ChakraModal, CustomInput, EthereumIcon, Form } from "@components/shared"

import { useDetailContext } from "../nft/details/useDetail"

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransferModal({ isOpen, onClose }: TransferModalProps) {
  const { tokenDetails, isFetched, collectionName, addressTo, setAddressTo, isLoadingTranfer, handleTransfer } =
    useDetailContext()
  const [error, setError] = useState("")

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!addressTo) {
      setError("This field is required")
    } else {
      handleTransfer()
    }
  }

  useEffect(() => {
    setAddressTo("")
  }, [isOpen])

  return (
    <ChakraModal title={"TRANSFER"} isOpen={isOpen} onClose={onClose} size="xl">
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
                0.00 ETH
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Form>
          <FormControl as="fieldset" mb="6">
            <FormLabel>
              Wallet address<chakra.span color="red.500"> *</chakra.span>
            </FormLabel>
            <InputGroup h="40px" rounded="base" border={!!error ? "1px" : "none"} borderColor="red.500">
              <CustomInput
                pr="3.5rem"
                value={addressTo}
                onChange={e => {
                  setError(""), setAddressTo(e.target.value)
                }}
              />
              <InputRightElement h="40px" color="neutral.400" width="3.5rem">
                <MdAccountBalanceWallet fontSize="1.2rem" />
              </InputRightElement>
            </InputGroup>
            {!!error && (
              <Text mt={1} fontSize="xs" color="red.500">
                {error}
              </Text>
            )}
          </FormControl>
        </Form>
        <Text color="neutral.400" mb="6">
          By clicking Transfer, I agree Sipher‘s{" "}
          <Link color="cyan.500" href="https://atherlabs.xyz/terms-conditions" isExternal>
            Term of Service
          </Link>
        </Text>
        <HStack justify="center">
          <Button isLoading={isLoadingTranfer} onClick={handleClick} py={5} fontSize="md">
            TRANSFER
          </Button>
          <Button
            onClick={onClose}
            py={5}
            fontSize="md"
            variant="secondary"
            colorScheme="neutral"
            border="1px"
            borderColor="neutral.600"
          >
            CANCEL
          </Button>
        </HStack>
      </Box>
    </ChakraModal>
  )
}
