import React from "react"
import Image from "next/image"
import { Box, Flex, Heading, HStack, Text } from "@sipher.dev/sipher-ui"

import { padZero } from "@utils"

const tutorialData = [
  {
    id: "OPEN LOOTBOX",
    description: "Wonders waiting for you to unravel inside this Lootbox.",
    flex: 2,
    image: "/images/spaceship/tutorial3.png",
  },
  {
    id: "GATHER SHIP PARTS",
    description: "Build your own spaceship with rarity-based components, from the basics to a full anatomy.",
    flex: 3,
    image: "/images/spaceship/tutorial1.png",
  },
  {
    id: "UP TO FLY",
    description: "Launch your tailored spaceship to embark on an epic ride across Sipheria.",
    flex: 2,
    image: "/images/spaceship/tutorial1.png",
  },
]

export const TutorialSpaceship = () => {
  return (
    <Flex pt={24} pos="relative" flexDir="column" align="center" w="full">
      <Flex flexDir="column" justify="center" maxW="1200px" w="full">
        <Flex mb={8} flexDir="column" align="flex-start">
          <Heading mb={4} fontWeight={600} fontSize="3xl">
            SPACESHIP TUTORIAL
          </Heading>
          <Text color="neutral.100">
            You can mint LootBoxes to NFTs on Polygon for trading on secondary Marketplaces or just open the box to get
            the random ship parts and build up a Spaceship for using in Sipher game.
          </Text>
        </Flex>
        <HStack spacing={8}>
          {tutorialData.map((item, index) => (
            <Box key={index} flex={item.flex}>
              <Text borderBottom="1px" borderColor="whiteAlpha.200" pb={2} mb={2} fontWeight={600}>
                {padZero(index + 1, 2)}
              </Text>
              <Flex flexDir="column" align="center">
                <Text mb={4} fontWeight={600} w="full">
                  {item.id}
                </Text>
                <Text w="full" color="neutral.100">
                  {item.description}
                </Text>
                <Box pos="relative" h="14rem" w="full">
                  <Image quality={100} src={item.image} alt={item.id} objectFit="contain" layout="fill" />
                </Box>
              </Flex>
            </Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  )
}
