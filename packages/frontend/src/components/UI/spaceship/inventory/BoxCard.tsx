import React, { useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import Image from "next/image"
import { Box, Button, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { SpLayer } from "@components/shared/icons"

import { useInventory } from "./useInventory"

interface CardProps {
  data: ReturnType<typeof useInventory>["inventoryData"][number]
  isFetched: boolean
}

export const BoxCard = ({ data, isFetched }: CardProps) => {
  const { isChecked, onSelect, isDisabled, onView, propertyLootbox, mintable } = data
  const [imageLoad, setImageLoad] = useState(false)

  return (
    <Box
      onClick={() => onSelect(!isChecked)}
      _hover={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      role="group"
      overflow="hidden"
      rounded="lg"
      cursor={"pointer"}
      opacity={!isDisabled ? "1" : "0.6"}
      bg="neutral.700"
      pos="relative"
    >
      {!isDisabled && (
        <Box
          _groupHover={{ opacity: 1 }}
          transition=".35s opacity"
          pos="absolute"
          left={3}
          top={3}
          zIndex={1}
          opacity={isChecked ? 1 : 0}
        >
          <CustomCheckbox onChange={e => onSelect(!e.target.checked)} isChecked={isChecked} />
        </Box>
      )}

      <Button
        transition=".35s opacity"
        pointerEvents={!isDisabled ? "unset" : "none"}
        onClick={e => {
          e.stopPropagation()
          !isDisabled && onView()
        }}
        _groupHover={{ opacity: 1 }}
        size="sm"
        pl={1.5}
        pr={1}
        rounded="full"
        bg="white"
        pos="absolute"
        right={3}
        top={3}
        zIndex={1}
        opacity={0}
      >
        <Flex align="center">
          <Text fontSize="sm">{"View"}</Text>
          <Box>
            <BiChevronRight size="1.2rem" />
          </Box>
        </Flex>
      </Button>
      <Skeleton bg="black" pos="relative" isLoaded={imageLoad && isFetched}>
        <Image
          quality={100}
          width={500}
          height={400}
          objectFit="contain"
          src={propertyLootbox.image}
          alt={propertyLootbox.name}
          loading="lazy"
          onLoad={() => setImageLoad(true)}
        />
        <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left="0.5rem">
          <SpLayer />
          <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
            {mintable}
          </Text>
        </Flex>
      </Skeleton>
      <Stack spacing={2} px={4} pt={2} pb={4}>
        <Skeleton isLoaded={isFetched}>
          <Text fontWeight={600}>{propertyLootbox.name}</Text>
        </Skeleton>
        <Skeleton isLoaded={isFetched}>
          <Text color="neutral.400" title={propertyLootbox.description}>
            {propertyLootbox.description.slice(0, 45)}...
          </Text>
        </Skeleton>
      </Stack>
    </Box>
  )
}
