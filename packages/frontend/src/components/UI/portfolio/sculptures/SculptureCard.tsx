import React, { useState } from "react"
import { MdInfo } from "react-icons/md"
import Image from "next/image"
import { Box, Button, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { NftContracts } from "@constant"

interface CardProps {
  name: string
  tokenId: number
  collectionId: string
  imageUrl: string
  isChecked: boolean
  onClick: (id: number) => void
}

export const SculptureCard = ({ tokenId, name, collectionId, isChecked, imageUrl, onClick }: CardProps) => {
  const collectionName = NftContracts.find(property => property.address === collectionId)?.name

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
          height={152 * 2}
          width={212 * 2}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Stack spacing={4} px={4} pt={2} pb={4}>
        <Box>
          <Text fontWeight={600}>{name}</Text>
          <Text color="neutral.400">{collectionName}</Text>
        </Box>
        <Button>REDEEM SCULPTURE</Button>
        <Flex align="flex-start">
          <Box color="neutral.500">
            <MdInfo />
          </Box>
          <Text ml={2} color="neutral.400" fontSize="xs">
            Redeem in bulk to save on gas fees
          </Text>
        </Flex>
      </Stack>
    </Box>
  )
}
