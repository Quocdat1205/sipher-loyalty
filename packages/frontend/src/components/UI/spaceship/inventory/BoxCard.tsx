import React, { useState } from "react"
import Image from "next/image"
import { Box, Button, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"

interface CardProps {
  name: string
  tokenId: number
  imageUrl: string
  isChecked: boolean
  onClick: (id: number) => void
}

export const BoxCard = ({ tokenId, name, isChecked, imageUrl, onClick }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Box
      onClick={() => onClick(tokenId)}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      bg="neutral.700"
      pos="relative"
    >
      <Box pos="absolute" right={3} top={3} zIndex={2}>
        <CustomCheckbox isChecked={isChecked} />
      </Box>
      <Skeleton isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={182 * 2}
          width={182 * 2}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Stack spacing={4} px={4} pt={2} pb={4}>
        <Text fontWeight={600}>{name}</Text>
        <Button>MINT NFT</Button>
      </Stack>
      <Flex align="center" py={0.5} px={2} rounded="md" bg="accent.500" pos="absolute" top="0.5rem" left="0.5rem">
        <Text fontWeight={600} color="neutral.900">
          x 10
        </Text>
      </Flex>
    </Box>
  )
}
