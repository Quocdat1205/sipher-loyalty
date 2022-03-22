import React, { useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import Image from "next/image"
import { Box, Button, Flex, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomCheckbox } from "@components/shared"
import { SpLayer } from "@components/shared/icons"
import { ERC1155SpaceShipPartLootbox } from "@sdk"

interface CardProps {
  isCheckAccountClaim: boolean
  propertyLootbox: ERC1155SpaceShipPartLootbox
  tokenId: string
  isChecked: boolean
  mintable: number
  onClick: (id: string, isChecked?: boolean) => void
  handleView: (id: string) => void
}

export const BoxCard = ({
  isCheckAccountClaim,
  tokenId,
  isChecked,
  propertyLootbox,
  onClick,
  handleView,
  mintable,
}: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Box
      onClick={() => isCheckAccountClaim && onClick(tokenId, undefined)}
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      role="group"
      overflow="hidden"
      rounded="lg"
      cursor={isCheckAccountClaim ? "pointer" : "unset"}
      bg="neutral.700"
      pos="relative"
    >
      {isCheckAccountClaim && (
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
      )}

      <Button
        transition=".35s opacity"
        pointerEvents={isCheckAccountClaim ? "unset" : "none"}
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
          <Text fontSize="sm">{isCheckAccountClaim ? "View" : "Doesn't own"}</Text>
          <Box>
            <BiChevronRight size="1.2rem" />
          </Box>
        </Flex>
      </Button>
      <Skeleton pos="relative" isLoaded={imageLoaded}>
        <Image
          src={propertyLootbox.image ?? ""}
          alt={propertyLootbox.name}
          loading="lazy"
          height={182 * 2}
          width={182 * 2}
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
