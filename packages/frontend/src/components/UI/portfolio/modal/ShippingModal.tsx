import React, { useEffect, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"

import { ChakraModal, CustomInput, CustomRadio, EthereumIcon, SipherIcon } from "@components/shared"

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

const feeData = ["USDT", "ETH", "SIPHER"]

export const ShippingModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const [feeType, setFeeType] = useState(feeData[0])

  useEffect(() => {
    setFeeType(feeData[0])
  }, [isOpen])

  return (
    <ChakraModal title={"SHIPPING INFO"} isOpen={isOpen} onClose={onClose} size="2xl">
      <Box>
        <Divider mb={4} borderColor="whiteAlpha.100" orientation="horizontal" />
        <Box>
          <Text color="grey.200" fontWeight={600}>
            You order (1)
          </Text>
          <Stack py={4}>
            <Flex align="center">
              <Avatar />
              <Box ml={4}>
                <Text fontWeight={600}>NEKO SCULPTURE #12</Text>
                <Flex>
                  <Text color="neutral.400">
                    Dimension{" "}
                    <chakra.span px={4} color="white">
                      48 x 37 x 16 cm
                    </chakra.span>
                  </Text>
                  <Text ml={2} color="neutral.400">
                    Weight{" "}
                    <chakra.span px={4} color="white">
                      3 kg
                    </chakra.span>
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </Box>
        <Divider mb={4} borderColor="whiteAlpha.100" orientation="horizontal" />
        <Box>
          <Text color="grey.200" fontWeight={600}>
            Shipping Fee
          </Text>
          <Flex align="center" justify="space-between">
            <HStack spacing={10} py={4}>
              {feeData.map(item => (
                <CustomRadio value={item} isChecked={item === feeType} onChange={e => setFeeType(e.target.value)}>
                  <Flex align="center">
                    <Box>
                      {item === "ETH" ? (
                        <EthereumIcon size="1.4rem" />
                      ) : item === "SIPHER" ? (
                        <SipherIcon mr={2} size="1.2rem" />
                      ) : (
                        <Image mr={2} src="/images/icons/usdt.svg" alt="usdt" h="1.2rem" />
                      )}
                    </Box>
                    <Text fontWeight={600}>{item}</Text>
                  </Flex>
                </CustomRadio>
              ))}
            </HStack>
            <Text color="neutral.50" fontWeight={600} fontSize="lg">
              100$
            </Text>
          </Flex>
        </Box>
        <Divider mb={4} borderColor="whiteAlpha.100" orientation="horizontal" />
        <Box>
          <Text mb={6} color="grey.200" fontWeight={600}>
            Receiver Info
          </Text>
          <Flex align="flex-start" mb="6">
            <FormControl as="fieldset">
              <FormLabel fontWeight={400}>First Name</FormLabel>
              <CustomInput />
            </FormControl>
            <FormControl ml={8} as="fieldset">
              <FormLabel fontWeight={400}>Last Name</FormLabel>
              <CustomInput />
            </FormControl>
          </Flex>
          <Flex align="flex-start" mb="6">
            <FormControl as="fieldset">
              <FormLabel fontWeight={400}>Email Address</FormLabel>
              <CustomInput />
            </FormControl>
            <FormControl ml={8} as="fieldset">
              <FormLabel fontWeight={400}>Phone</FormLabel>
              <CustomInput />
            </FormControl>
          </Flex>
        </Box>
        <Divider mb={4} borderColor="whiteAlpha.100" orientation="horizontal" />
        <Box>
          <Text mb={6} color="grey.200" fontWeight={600}>
            Shipping Address
          </Text>
          <Box mb="6">
            <FormControl as="fieldset">
              <FormLabel fontWeight={400}>Street Address</FormLabel>
              <CustomInput />
            </FormControl>
          </Box>
          <Flex align="flex-start" mb="6">
            <FormControl as="fieldset">
              <FormLabel fontWeight={400}>Town/City</FormLabel>
              <CustomInput />
            </FormControl>
            <FormControl ml={8} as="fieldset">
              <FormLabel fontWeight={400}>State</FormLabel>
              <CustomInput />
            </FormControl>
          </Flex>
          <Flex align="flex-start" mb="6">
            <FormControl as="fieldset">
              <FormLabel fontWeight={400}>Country/Region</FormLabel>
              <CustomInput />
            </FormControl>
            <FormControl ml={8} as="fieldset">
              <FormLabel fontWeight={400}>ZIP Code</FormLabel>
              <CustomInput />
            </FormControl>
          </Flex>
        </Box>
      </Box>
      <Divider orientation="horizontal" />
      <HStack pt={6} pb={2} justify="center">
        <Button>SAVE</Button>
        <Button border="1px" borderColor="neutral.600" colorScheme="neutral" variant="secondary" onClick={onClose}>
          CANCEL
        </Button>
      </HStack>
    </ChakraModal>
  )
}
