import React from "react"
import { BiChevronLeft } from "react-icons/bi"
import { useRouter } from "next/router"
import { Box, Button, Divider, Flex, Text } from "@sipher.dev/sipher-ui"

import ShippingInfo from "./ShippingInfo"

const ShippingUI = () => {
  const router = useRouter()
  return (
    <Flex pos="relative" flex={1} w="full" flexDir="column" align="center">
      <Flex pos="fixed" top="4.5rem" left={0} zIndex={1} flexDir="column">
        <Box pt={8} px={8} w="full">
          <Button
            onClick={() => router.push("/portfolio")}
            pl={2}
            bg="white"
            rounded="full"
            colorScheme="neutral"
            role="group"
            _hover={{ color: "white", bg: "neutral.600" }}
            variant="secondary"
            alignItems="center"
          >
            <Box _groupHover={{ color: "white" }} color="neutral.500">
              <BiChevronLeft size="1.4rem" />
            </Box>
            <Text _groupHover={{ color: "white" }} color="neutral.500">
              BACK
            </Text>
          </Button>
        </Box>
      </Flex>
      <Flex px={[4, 4, 4, 0, 0]} flexDir="column" w="full" maxW="1200px">
        <Flex pt={24}>
          <Box flex={1}>
            <ShippingInfo />
          </Box>
          <Box ml={24} flex={1}>
            <Text fontSize="2xl" fontWeight={600}>
              OVERVIEW & PAYMENT
            </Text>
            <Divider pt={10} borderColor="whiteAlpha.100" />
          </Box>
        </Flex>
      </Flex>
      <Divider pt={10} borderColor="whiteAlpha.100" />
      <Box py={6} textAlign="right" w="full" maxW="1200px">
        <Button py={5} textTransform="uppercase" size="md" fontSize="md">
          Place order
        </Button>
      </Box>
    </Flex>
  )
}

export default ShippingUI
