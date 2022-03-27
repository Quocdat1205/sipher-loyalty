import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Img, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { useAirdrops } from "./useAirdrops"

interface AirdropProps {
  data: ReturnType<typeof useAirdrops>["allAirdrops"][number]
  isFetched: boolean
}

const AirdropCard = ({ data, isFetched }: AirdropProps) => {
  return (
    <Flex
      flexDir="column"
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      bg="neutral.700"
      rounded="lg"
      overflow="hidden"
    >
      {data.type === "MERCH" ? (
        <Skeleton
          display="flex"
          role="group"
          alignItems="center"
          justifyContent="center"
          bg="black"
          pos="relative"
          w="full"
          h="12rem"
          sx={{
            img: {
              pos: "absolute",
              left: 0,
              transition: "opacity 0.5s ease-in-out",
            },
          }}
          isLoaded={isFetched && data.imageUrls?.length > 0}
        >
          <Img src={"/images/airdrops/sipher.png"} objectFit="contain" h="full" />
          <Img
            _groupHover={{
              opacity: 0,
            }}
            src={"https://sipherstorage.s3.ap-southeast-1.amazonaws.com/loyalty/erc1155/lootbox/Lootbox_1.gif"}
            objectFit="contain"
            h="full"
          />
        </Skeleton>
      ) : (
        <Skeleton
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="black"
          pos="relative"
          w="full"
          isLoaded={isFetched && data.imageUrls?.length > 0}
        >
          <Image
            src={data.imageUrls?.length > 0 ? data.imageUrls[0].default : "/images/airdrops/sipher.png"}
            objectFit="contain"
            width={212 * 1.5}
            height={188 * 1.5}
          />
        </Skeleton>
      )}
      <Flex flexDir="column" flex={1} p={4}>
        <Box flex={1}>
          <Skeleton mb={1} isLoaded={isFetched}>
            <Text fontWeight={600}>{data.name}</Text>
          </Skeleton>
          <Skeleton isLoaded={isFetched}>
            <Text mb={2} fontSize="xs" color="neutral.300">
              {data.description}
            </Text>
          </Skeleton>
        </Box>
        <Skeleton isLoaded={isFetched}>
          <Button onClick={data.onClaim} isLoading={data.isClaiming} isDisabled={data.isDisabled} w="full">
            CLAIM
          </Button>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default AirdropCard
