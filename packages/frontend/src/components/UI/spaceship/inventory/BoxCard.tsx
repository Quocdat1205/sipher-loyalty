import React, { useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import Image from "next/image"
import { Box, Button, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { SpLayer } from "@components/shared/icons"

interface CardProps {
  name: string
  tokenId: number
  imageUrl: string
  isChecked: boolean
  onClick: (id: number, isChecked?: boolean) => void
  handleView: (id: number | string) => void
}

export const BoxCard = ({ tokenId, name, isChecked, imageUrl, onClick, handleView }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Box
      onClick={() => onClick(tokenId, undefined)}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      role="group"
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Box
        _groupHover={{ opacity: 1 }}
        transition=".35s opacity"
        pos="absolute"
        left={3}
        top={3}
        zIndex={1}
        opacity={isChecked ? 1 : 0}
      >
        <CustomCheckbox onChange={() => onClick(tokenId, isChecked)} isChecked={isChecked} />
      </Box>
      <Button
        transition=".35s opacity"
        onClick={e => {
          e.stopPropagation()
          handleView(tokenId)
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
          <Text fontSize="sm">View</Text>
          <Box>
            <BiChevronRight size="1.2rem" />
          </Box>
        </Flex>
      </Button>
      <Skeleton pos="relative" isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={182 * 2}
          width={182 * 2}
          onLoad={() => setImageLoaded(true)}
        />
        <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white" pos="absolute" bottom="1rem" left="0.5rem">
          <SpLayer />
          <Text fontSize="xs" color="neutral.900" fontWeight={600}>
            5
          </Text>
        </Flex>
      </Skeleton>
      <Stack spacing={2} px={4} pt={2} pb={4}>
        <Text fontWeight={600}>{name}</Text>
        <Text color="neutral.400">Just for INU & NEKO holders</Text>
      </Stack>
    </Box>
  )
}
