import React from "react"
import { Box, Img, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

const LoadingCard = ({ gridSize }) => {
  return (
    <Box
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Skeleton bg="black" pos="relative">
        <Img
          src={"/images/nft/sipher1.png"}
          alt="loading card"
          minH={gridSize === "small" ? "12rem" : "20rem"}
          w="full"
          objectFit="contain"
        />
      </Skeleton>
      <Stack spacing={1} pt={2} pb={4} px={4}>
        <Skeleton>
          <Text fontWeight={600}>{123}</Text>
        </Skeleton>
        <Skeleton>
          <Text color="neutral.400">{123}</Text>
        </Skeleton>
      </Stack>
    </Box>
  )
}
export default LoadingCard
