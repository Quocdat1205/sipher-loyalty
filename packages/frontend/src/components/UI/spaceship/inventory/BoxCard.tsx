import React, { useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import { Box, Button, Flex, Img, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { SpLayer } from "@components/shared/icons"
import { shortenAddress } from "@utils"

import { useInventory } from "./useInventory"

interface CardProps {
  data: ReturnType<typeof useInventory>["inventoryData"][number]
  isFetched: boolean
}

export const BoxCard = ({ data, isFetched }: CardProps) => {
  const { isChecked, onSelect, isDisabled, onView, propertyLootbox, mintable, publicAddress } = data
  const [imageLoad, setImageLoad] = useState(false)

  return (
    <Box
      onClick={() => onSelect(!isChecked)}
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      role="group"
      overflow="hidden"
      rounded="lg"
      cursor={"pointer"}
      bg="neutral.700"
      pos="relative"
    >
      {!isDisabled && (
        <Flex
          justify="space-between"
          align="center"
          _groupHover={{ opacity: 1 }}
          pointerEvents={!isDisabled ? "unset" : "none"}
          transition=".35s opacity"
          pos="absolute"
          right={0}
          left={0}
          px={4}
          top={3}
          zIndex={1}
          opacity={isChecked ? 1 : 0}
        >
          <CustomCheckbox onChange={e => onSelect(!e.target.checked)} isChecked={isChecked} />
          <Button
            transition=".35s opacity"
            onClick={e => {
              e.stopPropagation()
              !isDisabled && onView()
            }}
            _groupHover={{ opacity: 1 }}
            size="sm"
            rounded="full"
            bg="white"
          >
            <Flex align="center">
              <Text fontSize="sm">{"View"}</Text>
              <Box>
                <BiChevronRight size="1.2rem" />
              </Box>
            </Flex>
          </Button>
        </Flex>
      )}
      <Skeleton bg="black" pos="relative" isLoaded={imageLoad && isFetched}>
        {isDisabled && (
          <Box
            transition=".35s opacity"
            _groupHover={{ opacity: 1 }}
            bg="white"
            rounded="full"
            px={4}
            py={2}
            zIndex={2}
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            opacity={0}
          >
            <Text textAlign="center" fontSize="sm" color="neutral.900" fontWeight={600}>
              Owned by:
            </Text>
            <Text color="neutral.900" fontWeight={600}>
              {shortenAddress(publicAddress)}
            </Text>
          </Box>
        )}
        <Img
          minH="16rem"
          objectFit="contain"
          src={propertyLootbox?.image ?? "https://via.placeholder.com/150"}
          alt={propertyLootbox?.name}
          loading="lazy"
          onLoad={() => setImageLoad(true)}
        />
        <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left={4}>
          <SpLayer />
          <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
            {mintable}
          </Text>
        </Flex>
      </Skeleton>
      <Stack spacing={2} px={4} pt={2} pb={4}>
        <Skeleton isLoaded={isFetched}>
          <Text fontWeight={600}>{propertyLootbox?.name}</Text>
        </Skeleton>
        <Skeleton isLoaded={isFetched}>
          <Text color="neutral.400" title={propertyLootbox?.description}>
            {propertyLootbox?.description.slice(0, 45)}...
          </Text>
        </Skeleton>
      </Stack>
    </Box>
  )
}
