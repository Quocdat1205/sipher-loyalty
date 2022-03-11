import React, { useState } from "react"
import Image from "next/image"
import { Button, Flex, Skeleton } from "@sipher.dev/sipher-ui"

interface CardProps {
  name: string
  imageUrl: string
  isActive: boolean
}

export const ClaimCard = React.memo(({ isActive, name, imageUrl }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Flex align="center" justify="center" flexDir="column" pos="relative">
      <Skeleton
        cursor="pointer"
        overflow="hidden"
        rounded="lg"
        display="flex"
        _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
        isLoaded={imageLoaded}
      >
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={182 * 2}
          width={182 * 2}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Flex transition="0.25s opacity ease-in-out" opacity={isActive ? 1 : 0} align="center" p={6}>
        <Button>ClAIM LOOTBOX</Button>
        <Button ml={4}>CLAIM ALL LOOTBOXES(10)</Button>
      </Flex>
    </Flex>
  )
})
