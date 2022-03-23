import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { Timeline } from "./Timeline"
import { TutorialSpaceship } from "./TutorialSpaceship"
import useOverview from "./useOverview"

const dataShip = [
  { id: "Mass", value: "975 t" },
  { id: "Cargo", value: "210 m3" },
  { id: "Est. Value", value: "94m isk" },
  { id: "Hitpoints", value: "1740" },
  { id: "Velocity", value: "321 m/2" },
  { id: "Spec", value: "Exploration" },
]

export const SpaceshipContainer = () => {
  const { mappedData, activeData } = useOverview()
  const router = useRouter()

  return (
    <Flex
      flexDir="column"
      align="center"
      w="full"
      backgroundImage="url(/images/spaceship/bg-galaxy.png), linear-gradient(180deg, rgba(41, 42, 64, 0.3) 5%, rgba(0, 0, 0, 0.215) 59.01%, rgba(0, 0, 0, 0.5) 100%)"
      bgRepeat="no-repeat"
      bgPos="100% 30%"
      bgSize="cover"
    >
      <Box py={16} maxW="1200px" w="full">
        <Flex mb={24} justify="space-between" align="center">
          <Box flex={1}>
            <Text color="whiteAlpha.700" fontWeight={600} mb={2}>
              Week {activeData.week}
            </Text>
            <Heading fontWeight={600} mb={4} fontSize="4xl" textTransform={"uppercase"}>
              {activeData.title}
            </Heading>
            <Text color="neutral.100" mb={32} fontSize="lg">
              {activeData.description}
            </Text>
            <Button onClick={() => router.push({ query: { tab: "claim" } })} size="lg" letterSpacing="1px">
              CLAIM LOOTBOX
            </Button>
          </Box>
          <Flex pos="relative" flexDir="column" align="flex-end" ml={8} p={4} flex={1}>
            <Flex
              p={6}
              flexDir="column"
              rounded="lg"
              transform="auto"
              skewX="-15deg"
              bg="rgba(41, 42, 64, 0.6)"
              w="25rem"
              h="32rem"
            >
              <Box flex={3} overflow="hidden">
                <Box
                  zIndex={2}
                  transform="auto"
                  skewX="15deg"
                  pos="absolute"
                  top="0"
                  left="0"
                  translateX="-15%"
                  translateY="5%"
                >
                  <Image
                    src={activeData.image || ""}
                    alt={activeData.description}
                    width={480}
                    height={340}
                    quality={100}
                  />
                </Box>
                <Box
                  transform="auto"
                  skewX="15deg"
                  bg="blackAlpha.800"
                  boxShadow="0px 0px 30px #000000"
                  filter="blur(50px)"
                  boxSize="15rem"
                  position="absolute"
                  top="0"
                  left="50%"
                  rounded="full"
                  translateX="-50%"
                  translateY="15%"
                />
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
        <Timeline mappedData={mappedData} />
        <TutorialSpaceship />
      </Box>
    </Flex>
  )
}
