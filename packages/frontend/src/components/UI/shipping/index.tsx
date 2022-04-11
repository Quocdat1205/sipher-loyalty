import React from "react"
import { BiChevronLeft, BiChevronsDown } from "react-icons/bi"
import { useRouter } from "next/router"
import { Box, Button, Divider, Flex, Text } from "@sipher.dev/sipher-ui"

import useDetectScrollBottom from "src/hooks/useDetectScrollBottom"

import OverviewPayment from "./OverviewPayment"
import ShippingInfo from "./ShippingInfo"

const ShippingUI = () => {
  const router = useRouter()
  const { isEnd, onScroll, listInnerRef } = useDetectScrollBottom()

  return (
    <Flex overflow="hidden" bg="neutral.700" pos="relative" flex={1} w="full" flexDir="column" align="center">
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
      <Flex overflow="hidden" flexDir="column" flex={1}>
        <Flex overflow="hidden" flex={1} px={[4, 4, 4, 0, 0]} flexDir="column" w="full" maxW="1200px">
          <Flex w="full" overflow="hidden" flex={1} pt={20}>
            <Box
              ref={listInnerRef}
              pos="relative"
              onScroll={onScroll}
              overflow="auto"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              h="full"
              flex={1}
            >
              <ShippingInfo />
            </Box>
            <Box overflow="hidden" h="full" ml={"6rem"} flex={1}>
              <OverviewPayment />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDir="column" align="center" w="full">
        <Divider pt={10} borderColor="whiteAlpha.100" />
        <Box pos="relative" py={4} textAlign="right" w="full" maxW="1200px">
          {!isEnd && (
            <Box
              bg="neutral.300"
              p={2}
              rounded="md"
              zIndex={1}
              pos="absolute"
              bottom={0}
              left="calc(25% - 1.5rem)"
              transform="translate(-50%, -6rem)"
            >
              <Flex flexDir="column" align="center" color="neutral.900">
                <BiChevronsDown size="1.6rem" />
              </Flex>
            </Box>
          )}
          <Button py={5} textTransform="uppercase" size="md" fontSize="md">
            Place order
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ShippingUI
