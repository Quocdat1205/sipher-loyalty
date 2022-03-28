import React, { Fragment } from "react"
import { MdInfo } from "react-icons/md"
import { Box, Flex, HStack, Link, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { ClipboardCopy, CustomPopover } from "@components/shared"

import HeartAndView from "./HeartAndView"
import InfoNFT from "./InfoNFT"
import { useDetailContext } from "./useDetail"

interface HeaderDetailsProps {
  tokenDetails: ReturnType<typeof useDetailContext>["tokenDetails"]
  isFetched: boolean
}

const HeaderDetails = ({ tokenDetails, isFetched }: HeaderDetailsProps) => {
  return (
    <>
      <Flex pr={2} w="full" align="center" justify={"space-between"} mb={2}>
        <Skeleton isLoaded={isFetched}>
          <Text fontWeight={600} letterSpacing="1px" fontSize={"4xl"}>
            {tokenDetails?.name}
          </Text>
        </Skeleton>
        <Skeleton display={["none", "block"]} isLoaded={isFetched}>
          <HeartAndView />
        </Skeleton>
      </Flex>
      <Stack pr={2} mb={2} spacing={4}>
        <Skeleton isLoaded={isFetched}>
          <HStack align="center" spacing={[4, 8]} justify={["space-between", "flex-start"]} mb={4}>
            <Flex align="center">
              <Text fontWeight={600} color="neutral.400" mr={1}>
                Token ID:
              </Text>
              <Text mr={2}>{tokenDetails?.tokenId}</Text>
              <ClipboardCopy text={tokenDetails?.tokenId ?? ""} />
            </Flex>
            <Flex align="center">
              <Text fontWeight={600} color="neutral.400" mr={1}>
                {tokenDetails?.rarityRank ? "Rarity Rank:" : "Quantity(s):"}
              </Text>
              {tokenDetails?.rarityRank ? (
                <Fragment>
                  <Box textAlign="center" px={1} py={0.5} rounded="base" bg="purple.500" mr={2}>
                    <Text w="full" textDecoration="underline">
                      #{tokenDetails?.rarityRank}
                    </Text>
                  </Box>
                  <CustomPopover
                    label="Rarity Rank Info"
                    icon={
                      <Box color="neutral.500">
                        <MdInfo size="1.2rem" />
                      </Box>
                    }
                  >
                    <Text color="neutral.900">
                      This Rarity ranking based on{" "}
                      <Link target="_blank" href="https://rarity.tools" color="blue.400">
                        https://rarity.tools
                      </Link>
                    </Text>
                  </CustomPopover>
                </Fragment>
              ) : (
                <Text>{tokenDetails?.value}</Text>
              )}
            </Flex>
          </HStack>
        </Skeleton>
        <InfoNFT isFetched={isFetched} tokenDetails={tokenDetails} />
        <Skeleton display={["block", "none"]} isLoaded={isFetched}>
          <HeartAndView />
        </Skeleton>
      </Stack>
    </>
  )
}
export default HeaderDetails
