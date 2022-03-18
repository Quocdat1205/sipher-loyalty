import React from "react"
import Image from "next/image"
import { Avatar, Box, Flex, Heading, Link, Stack, Text } from "@sipher.dev/sipher-ui"

import { SpVerified } from "@components/shared/icons"

interface DetailsCollectionProps {
  id: string | string[] | undefined
}

export const DetailsCollection = ({ id }: DetailsCollectionProps) => {
  console.log(id)
  return (
    <Box>
      <Box pos="relative" h="18rem">
        <Image src="/images/spaceship/banner.png" layout="fill" alt="banner" />
      </Box>
      <Stack flexDir="column" align="center" pos="relative">
        <Avatar pos="absolute" transform="translateY(-50%)" size="xl" />
        <Flex pt={16} align="center">
          <Heading mr={1} fontSize="3xl" fontWeight={600}>
            Sipherian Surge
          </Heading>
          <Box>
            <SpVerified size="1.8rem" viewBox="-2 0 20 15" />
          </Box>
        </Flex>
        <Text>
          Created by{" "}
          <Link color="cyan.600" isExternal>
            SIPHERxyz
          </Link>
        </Text>
      </Stack>
    </Box>
  )
}
