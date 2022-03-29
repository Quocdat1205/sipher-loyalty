import React, { Fragment } from "react"
import { Box, Button, HStack, Skeleton } from "@sipher.dev/sipher-ui"

import { useDetailContext } from "./useDetail"

interface ActionContainerProps {
  isFetched: boolean
}

const ActionContainer = ({ isFetched }: ActionContainerProps) => {
  const { tokenDetails, handleLinkOpenSea } = useDetailContext()
  return (
    <Box
      px={4}
      pos="sticky"
      bottom={0}
      bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(51, 52, 74, 0) 100%)"
      backdropFilter="blur(10px)"
      py={4}
      borderTop="1px"
      borderColor="neutral.600"
    >
      <HStack spacing={4}>
        {tokenDetails?.collection.collectionType === "ERC1155" ? (
          <Fragment>
            <Skeleton isLoaded={isFetched} flex={1}>
              <Button isDisabled py={5} colorScheme="accent" w="full">
                {tokenDetails?.collection.category === "lootbox" ? "BRING TO OFF-CHAIN" : "REDEEM SCULPTURE"}
              </Button>
            </Skeleton>
            <Skeleton isLoaded={isFetched} flex={1}>
              <Button onClick={handleLinkOpenSea} py={5} variant="secondary" colorScheme="cyan" w="full">
                VIEW ON MARKETPLACE
              </Button>
            </Skeleton>
          </Fragment>
        ) : (
          <Fragment>
            <Skeleton isLoaded={isFetched} flex={1}>
              <Button onClick={handleLinkOpenSea} py={5} variant="secondary" colorScheme="cyan" w="full">
                VIEW ON MARKETPLACE
              </Button>
            </Skeleton>
            <Skeleton isLoaded={isFetched} flex={1}></Skeleton>
          </Fragment>
        )}
      </HStack>
    </Box>
  )
}
export default ActionContainer
