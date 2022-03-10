import React from "react"
import Image from "next/image"
import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { Timeline } from "./Timeline"

const dataShip = [
  { id: "Mass", value: "975 t" },
  { id: "Cargo", value: "210 m3" },
  { id: "Est. Value", value: "94m isk" },
  { id: "Hitpoints", value: "1740" },
  { id: "Velocity", value: "321 m/2" },
  { id: "Spec", value: "Exploration" },
]

export const SpaceshipContainer = () => {
  return (
    <Flex
      flexDir="column"
      align="center"
      h="100vh"
      w="full"
      bg="url(/images/spaceship/bg-galaxy.png), linear-gradient(180deg, rgba(0, 0, 0, 0.5) 9.54%, rgba(0, 0, 0, 0.215) 59.01%, rgba(0, 0, 0, 0.5) 100%)"
      bgRepeat="no-repeat"
      bgPos="100% 30%"
      bgSize="cover"
    >
      <Box py={4} maxW="1200px" w="full">
        <Flex pt={16} pb={24} align="center">
          <Box flex={1} pr={32}>
            <Text color="whiteAlpha.700" fontWeight={600} mb={2}>
              Week 1
            </Text>
            <Heading fontWeight={600} mb={4} fontSize="3xl">
              Spaceship Astero
            </Heading>
            <Text color="neutral.100" mb={4}>
              An agile, tenacious ship that aptly adheres to the mantra of both rescuers and explorersL Stay safe, stay
              hidden, and use every tool at your disposal. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Text>
            <Text color="neutral.100">
              An agile, tenacious ship that aptly adheres to the mantra of both rescuers and explorersL Stay safe, stay
              hidden, and use every tool at your disposal. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Text>
            <Button size="lg" mt={8} letterSpacing="1px">
              REVEAL LOOTBOX
            </Button>
          </Box>
          <Flex flexDir="column" pos="relative" align="flex-end" ml={8} p={4} flex={1}>
            <Flex
              p={6}
              flexDir="column"
              rounded="lg"
              transform="auto"
              skewX="-15deg"
              bg="rgba(41, 42, 64, 0.6)"
              w="26rem"
              h="32rem"
            >
              <Box flex={3}>
                <Box
                  maxW="26rem"
                  transform="auto"
                  skewX="15deg"
                  pos="absolute"
                  top="0"
                  left="0"
                  translateX="-35%"
                  translateY="-10%"
                >
                  <Image src="/images/spaceship/plane.png" alt="plane" width={527} height={527} quality={100} />
                </Box>
              </Box>
              <Box p={6} borderTop="1px" borderColor="neutral.600" flex={1}>
                <SimpleGrid transform="auto" skewX="15deg" columns={3} spacing={4}>
                  {dataShip.map(item => (
                    <Box key={item.id}>
                      <Text color="neutral.300">{item.id}</Text>
                      <Text>{item.value}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Timeline />
      </Box>
    </Flex>
  )
}
