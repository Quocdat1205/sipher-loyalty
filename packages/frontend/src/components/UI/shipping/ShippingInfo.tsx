import React, { Fragment, useState } from "react"
import { Box, Divider, Flex, FormControl, FormLabel, HStack, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox, Select, StyledInput } from "@components/shared"

interface SelectType {
  state: Record<string, any> | null
  city: Record<string, any> | null
  country: Record<string, any> | null
}

const initSelectValue: SelectType = {
  state: null,
  city: null,
  country: null,
}

const dataExample = [
  {
    code: "A",
    name: "AB",
  },
  {
    code: "B",
    name: "ABC",
  },
  {
    code: "C",
    name: "ABCD",
  },
]

const ShippingInfo = () => {
  const [selectValue, setSelectValue] = useState(initSelectValue)

  return (
    <Fragment>
      <Text fontSize="xl" fontWeight={600}>
        SHIPPING INFO
      </Text>
      <Divider pt={10} mb={6} borderColor="whiteAlpha.100" />
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
                name="Town/City"
                selection={dataExample}
                value={selectValue.city}
                onSelect={newValue => setSelectValue({ ...selectValue, city: newValue })}
              />
            </Box>
            <Box flex={1}>
              <Select
                name="State"
                selection={dataExample}
                value={selectValue.state}
                onSelect={newValue => setSelectValue({ ...selectValue, state: newValue })}
              />
            </Box>
          </HStack>
          <HStack spacing={6} w="full">
            <Box flex={1}>
              <Select
                name="Country/Region"
                selection={dataExample}
                value={selectValue.country}
                onSelect={newValue => setSelectValue({ ...selectValue, country: newValue })}
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
        <Flex mb={4} align="flex-start">
          <CustomCheckbox pt={1} />
          <Text ml={2}>Save my Recipent Info & Shipping Address for future orders.</Text>
        </Flex>
      </Box>
    </Fragment>
  )
}

export default ShippingInfo
