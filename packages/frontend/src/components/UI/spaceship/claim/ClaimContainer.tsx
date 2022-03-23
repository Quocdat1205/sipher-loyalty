import React from "react"
import { Box, Button, chakra, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import ClaimCard from "./ClaimCard"
import ClaimStatusModal from "./ClaimStatusModal"
import { useClaim } from "./useClaim"

const ClaimContainer = () => {
  const {
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
    <Flex
      flex={1}
      pos="relative"
      bg="url(/images/spaceship/bg-claim.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
      flexDir="column"
      align="center"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient="linear(180deg, #1B1C27 0%, rgba(27, 28, 39, 0) 52.08%, #1B1C27 100%)"
      />
      <Box zIndex={2} maxW="1200px" w="full" pb={8}>
        <Flex mb={4} justify="center">
          <Box py={4} px={6} textAlign="center" bg="blackAlpha.500" borderRadius="0px 0px 16px 16px">
            <Text>
              You have{" "}
              <chakra.span fontWeight={600}>
                {totalQuantity} {totalQuantity > 1 ? "Lootboxes" : "Lootbox"}
              </chakra.span>
            </Text>
            <Text>Note the remaining time to claim</Text>
          </Box>
        </Flex>
        <HStack spacing={4} mb={4} justify="center">
          {claimData.map(item => (
            <ClaimCard key={item.id} isPopover={false} data={item} />
          ))}
        </HStack>
        <Flex w="full" justify="center">
          {claimData.length > 0 && (
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
        <ClaimStatusModal isOpen={isStatusModal !== ""} onClose={() => setIsStatusModal("")} status={isStatusModal} />
      </Box>
    </Flex>
  )
}

export default ClaimContainer
