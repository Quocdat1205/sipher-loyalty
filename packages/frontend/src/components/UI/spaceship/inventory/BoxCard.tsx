import React, { useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import Image from "next/image"
import { Box, Button, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { SpLayer } from "@components/shared/icons"

import { useInventory } from "./useInventory"

interface CardProps {
  data: ReturnType<typeof useInventory>["inventoryData"][number]
}

export const BoxCard = ({ data }: CardProps) => {
  const { isChecked, onSelect, isDisabled, onView, propertyLootbox, mintable } = data
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <Box
      onClick={() => !isDisabled && onSelect(!isChecked)}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      role="group"
      overflow="hidden"
      rounded="lg"
      cursor={!isDisabled ? "pointer" : "unset"}
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
          onView()
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
          <Text fontSize="sm">{!isDisabled ? "View" : "Doesn't own"}</Text>
          <Box>
            <BiChevronRight size="1.2rem" />
          </Box>
        </Flex>
      </Button>
      <Skeleton pos="relative" isLoaded={imageLoaded}>
        <Image
          height={280}
          width={280}
          src={propertyLootbox.image}
          alt={propertyLootbox.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left="0.5rem">
          <SpLayer />
          <Text fontSize="xs" color="neutral.900" fontWeight={600}>
            {mintable}
          </Text>
        </Flex>
      </Skeleton>
      <Stack spacing={2} px={4} pt={2} pb={4}>
        <Text fontWeight={600}>{propertyLootbox.name}</Text>
        <Text color="neutral.400">{propertyLootbox.description}</Text>
      </Stack>
    </Box>
  )
}
