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
    <Flex
      align="center"
      justify="center"
      flexDir="column"
      _hover={{ boxShadow: "rgb(255 255 255 / 30%) 0px 0px 8px 0px" }}
      overflow="hidden"
      rounded="lg"
      cursor="pointer"
      pos="relative"
    >
      <Skeleton isLoaded={imageLoaded}>
        <Image
          src={imageUrl || ""}
          alt={name}
          loading="lazy"
          height={182 * 2.3}
          width={182 * 2.3}
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Flex
        transition="0.25s opacity ease-in-out"
        opacity={isActive ? 1 : 0}
        align="center"
        justify="space-between"
        p={6}
      >
        <Button>ClAIM LOOTBOX</Button>
        <Button ml={4}>CLAIM ALL LOOTBOXES(10)</Button>
      </Flex>
    </Flex>
  )
})
