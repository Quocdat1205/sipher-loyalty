import React from "react"
import { Box, Flex, Heading, Img, Stack, Text } from "@sipher.dev/sipher-ui"

import { padZero } from "@utils"

const tutorialData = [
  {
    id: "OPEN LOOTBOX",
    description: "Wonders waiting for you to unravel inside this Lootbox.",
    flex: 2,
    image: "/images/spaceship/tutorial1.png",
  },
  {
    id: "GATHER SHIP PARTS",
    description: "Build your own spaceship with rarity-based components, from the basics to a full anatomy.",
    flex: 3,
    image: "/images/spaceship/tutorial2.png",
  },
  {
    id: "UP TO FLY",
    description: "Launch your tailored spaceship to embark on an epic ride across Sipheria.",
    flex: 2,
    image: "/images/spaceship/tutorial3.png",
  },
]

export const TutorialSpaceship = () => {
  return (
    <Flex py={8} pos="relative" flexDir="column" align="center" w="full">
      <Flex flexDir="column" justify="center" maxW="1200px" w="full">
        <Flex mb={12} align="flex-start">
          <Heading fontWeight={600} fontSize="5xl">
            SPACESHIP TUTORIAL
          </Heading>
          <Text color="neutral.100" ml={28} fontSize="lg">
            You can mint LootBoxes to NFTs on Polygon for trading on secondary Marketplaces or just open the box to get
            the random ship parts and build up a Spaceship for using in Sipher game.
          </Text>
        </Flex>
        <Stack direction={["column", "column", "row"]} spacing={12}>
          {tutorialData.map((item, index) => (
            <Box key={index} flex={item.flex}>
              <Text borderBottom="1px" borderColor="whiteAlpha.200" pb={2} mb={2} fontWeight={600}>
                {padZero(index + 1, 2)}
              </Text>
              <Flex flexDir="column" align="center">
                <Text mb={4} fontWeight={600} w="full">
                  {item.id}
                </Text>
                <Text mb={8} w="full" color="neutral.100">
                  {item.description}
                </Text>
                <Flex justify={["center", "center", "flex-start"]} pos="relative" w="full">
                  <Img quality={100} src={item.image} alt={item.id} objectFit="contain" maxH="14rem" />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Flex>
    </Flex>
  )
}
