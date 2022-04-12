import React, { Fragment } from "react"
import { Box, Button, chakra, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"

import { spaceshipTabs } from ".."

import ClaimCard from "./ClaimCard"
import ClaimStatusModal from "./ClaimStatusModal"
import { useClaim } from "./useClaim"

const ClaimContainer = () => {
  const {
    isFetched,
    account,
    claimData,
    mutateOnClaim,
    isLoading,
    totalQuantity,
    isCheckAccountClaim,
    isStatusModal,
    setIsStatusModal,
  } = useClaim()

  return (
    <Flex flex={1} pos="relative" flexDir="column" align="center">
      <Flex
        bgGradient="linear(150deg, #8A31E2 -125%, #0F041A 50%)"
        flexDir="column"
        align="center"
        zIndex={2}
        flex={1}
        w="full"
        pb={8}
        px={[4, 4, 4, 0, 0]}
      >
        <Box pt={16} w="full" maxW="1200px">
          <TabPage tabs={spaceshipTabs} />
        </Box>
        <Flex flexDir="column" w="full" align="center" justify="space-between">
          <Flex
            bgGradient="linear(270deg, rgba(0, 0, 0, 0) 20%, rgba(112, 0, 255, 0.5) 50%, rgba(0, 0, 0, 0) 80%)"
            w="full"
            justify="center"
          >
            <Box w="full" py={4} px={6} textAlign="center" borderRadius="0px 0px 16px 16px">
              <Text color={totalQuantity === 0 ? "whiteAlpha.800" : "neutral.400"}>
                {totalQuantity === 0 ? (
                  "You have no lootbox to claim, return next week to earn more!"
                ) : (
                  <Fragment>
                    You have{" "}
                    <chakra.span color="white" fontWeight={600}>
                      {totalQuantity} {totalQuantity > 1 ? "Lootboxes" : "Lootbox"}
                    </chakra.span>
                  </Fragment>
                )}
              </Text>
            </Box>
          </Flex>
          <HStack
            py={4}
            maxW="1200px"
            w="full"
            spacing={4}
            mb={4}
            justify={claimData.length > 1 ? "space-between" : "center"}
          >
            {claimData.map(item => (
              <ClaimCard key={item.id} isPopover={false} data={item} isFetched={isFetched} />
            ))}
          </HStack>
          <Flex w="full" justify="center">
            {!!account && claimData.length > 0 && (
              <Button
                isDisabled={!account || !isCheckAccountClaim || claimData.length === 0}
                isLoading={isLoading}
                onClick={() => mutateOnClaim()}
              >
                {isCheckAccountClaim
                  ? `CLAIM ${totalQuantity > 1 ? "LOOTBOXES" : "LOOTBOX"} (${totalQuantity})`
                  : "WALLET IS NOT REGISTERED"}
              </Button>
            )}
          </Flex>
        </Flex>
        <ClaimStatusModal isOpen={isStatusModal !== ""} onClose={() => setIsStatusModal("")} status={isStatusModal} />
      </Flex>
    </Flex>
  )
}

export default ClaimContainer
