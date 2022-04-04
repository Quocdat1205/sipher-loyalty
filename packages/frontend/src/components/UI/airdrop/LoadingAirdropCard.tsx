import React from "react"
import { Box, Button, Flex, Img, Skeleton, Text } from "@sipher.dev/sipher-ui"

const LoadingAirdropCard = () => {
  return (
    <Flex
      flexDir="column"
      cursor="pointer"
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      bg="neutral.700"
      rounded="lg"
      overflow="hidden"
    >
      <Skeleton
        display="flex"
        role="group"
        alignItems="center"
        justifyContent="center"
        pos="relative"
        w="full"
        overflow="hidden"
        bg="white"
        h="14rem"
        sx={{
          img: {
            pos: "absolute",
            left: 0,
            transition: "opacity 0.7s ease-in-out",
          },
        }}
      >
        <Img src={"/images/airdrops/sipher.png"} objectFit="contain" maxH="18rem" />
      </Skeleton>
      <Flex flexDir="column" flex={1} p={4}>
        <Box flex={1}>
          <Skeleton mb={1}>
            <Text fontWeight={600}>Loading</Text>
          </Skeleton>
          <Skeleton>
            <Text mb={2} fontSize="xs" color="neutral.300">
              Loading
            </Text>
          </Skeleton>
        </Box>
        <Skeleton>
          <Button textTransform="uppercase" w="full">
            Loading
          </Button>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default LoadingAirdropCard
