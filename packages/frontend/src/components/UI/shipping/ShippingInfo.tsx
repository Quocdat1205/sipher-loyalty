import React, { Fragment } from "react"
import { Box, Divider, Flex, FormControl, FormLabel, HStack, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox, Select, StyledInput } from "@components/shared"

import useShipping from "./useShipping"

const ShippingInfo = () => {
  const { state, city, country, selectValue, setSelectValue } = useShipping()

  return (
    <Fragment>
      <Text fontSize="xl" fontWeight={600}>
        SHIPPING INFO
      </Text>
      <Divider pt={8} mb={6} borderColor="whiteAlpha.100" />
      <FormControl>
        <FormLabel mb={6} fontWeight={600}>
          Recipent info
        </FormLabel>
        <Stack spacing={4}>
          <HStack spacing={6} w="full">
            <Box flex={1}>
              <StyledInput label="First name" />
            </Box>
            <Box flex={1}>
              <StyledInput label="Last name" />
            </Box>
          </HStack>
          <HStack spacing={6} w="full">
            <Box flex={1}>
              <StyledInput label="Email Address" />
            </Box>
            <Box flex={1}>
              <StyledInput label="Phone" />
            </Box>
          </HStack>
        </Stack>
      </FormControl>
      <Divider pt={4} mb={6} borderColor="whiteAlpha.100" />
      <FormControl>
        <FormLabel mb={6} fontWeight={600}>
          Shipping Address
        </FormLabel>
        <Stack spacing={4}>
          <Box w="full">
            <StyledInput label="Street Address" />
          </Box>
          <HStack spacing={6} w="full">
            <Box flex={1}>
              <Select
                keyField="name"
                searchable
                name="Country/Region"
                selection={country}
                value={selectValue.country}
                onSelect={newValue => setSelectValue({ ...selectValue, country: newValue })}
              />
            </Box>
            <Box flex={1}>
              <Select
                keyField="name"
                searchable
                name="State"
                selection={state}
                value={selectValue.state}
                onSelect={newValue => setSelectValue({ ...selectValue, state: newValue })}
              />
            </Box>
          </HStack>
          <HStack spacing={6} w="full">
            <Box flex={1}>
              <Select
                keyField="name"
                searchable
                name="Town/City"
                selection={city}
                value={selectValue.city}
                onSelect={newValue => setSelectValue({ ...selectValue, city: newValue })}
              />
            </Box>
            <Box flex={1}>
              <StyledInput label="ZIP Code" />
            </Box>
          </HStack>
        </Stack>
      </FormControl>
      <Box
        sx={{
          ".chakra-checkbox__control": {
            borderRadius: "4px!important",
            bg: "transparent",
          },
        }}
        mt={8}
      >
        <Text mb={6}>
          Your personal information will only be used to process the order. We take your privacy seriously and delete
          your details once the order has been shipped.
        </Text>
        <Flex mb={4} align="flex-start">
          <CustomCheckbox pt={1} />
          <Text ml={2}>
            I understand my order is not finalised until I transfer the Shipping Fee to Sipher, from the same wallet
            holding the Sculpture NFT.
          </Text>
        </Flex>
        <Flex mb={8} align="flex-start">
          <CustomCheckbox pt={1} />
          <Text ml={2}>Save my Recipent Info & Shipping Address for future orders.</Text>
        </Flex>
        <Text fontWeight={600} mb={4}>
          DISCLAIMER
        </Text>
        <Text>
          You are solely responsible for determining any tax payable by you or other regulatory obligations associated
          with claiming, redeeming, and receiving the physical items and declaring, withholding, collecting, reporting,
          and remitting the correct amount of tax to the appropriate tax authorities. You will be solely liable for all
          penalties, claims, fines, punishments, or other liabilities arising from the non-fulfilment or non-performance
          to any extent of any of your aforementioned obligations. To the maximum extent permitted by all applicable
          laws and regulations, we hereby expressly disclaim our liability and shall in no case be liable to you or any
          person for: - any loss, cost, expense, or tax associated with any secondary transfer in relation to the
          physical items; - any prohibition, restriction, or regulation by any government or regulatory authority in any
          jurisdiction of the functionality, usage, storage, transmission mechanisms, transferability, tradability, or
          other material characteristics of the physical items.
        </Text>
      </Box>
    </Fragment>
  )
}

export default ShippingInfo
