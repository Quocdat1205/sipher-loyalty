import React from "react"
import { Box, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { SpLayer } from "@components/shared/icons"

export const LoadingBoxCard = () => {
  return (
    <Box
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      role="group"
      overflow="hidden"
      rounded="lg"
      cursor={"pointer"}
      bg="neutral.700"
      pos="relative"
    >
      <Skeleton sx={{ video: { minH: "18rem" } }} bg="black" pos="relative">
        <Box _groupHover={{ opacity: 0.6 }}>
          <video
            autoPlay
            loop
            muted
            datatype="video/mp4"
            src={
              "https://sipherstorage.s3.ap-southeast-1.amazonaws.com/loyalty/erc1155/lootbox/spaceship_lootbox_tokenID_1.mp4"
            }
          />
        </Box>
        <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left={4}>
          <SpLayer />
          <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
            {0}
          </Text>
        </Flex>
      </Skeleton>
      <Stack spacing={2} p={4}>
        <Skeleton>
          <Text fontWeight={600}>Loading</Text>
        </Skeleton>
        <Skeleton>
          <Text color="neutral.400">Loading</Text>
        </Skeleton>
      </Stack>
    </Box>
  )
}
