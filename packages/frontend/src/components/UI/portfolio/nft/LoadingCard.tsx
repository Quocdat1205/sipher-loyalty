import React from "react"
import Image from "next/image"
import { Box, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

const LoadingCard = () => {
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
        <Image
          src={"/images/nft/sipher1.png"}
          alt="loading card"
          layout="responsive"
          loading="lazy"
          height={480}
          width={425}
          quality={100}
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
