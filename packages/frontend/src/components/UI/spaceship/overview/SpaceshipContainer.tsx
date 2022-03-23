import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"

import { spaceshipTabs } from ".."

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
      backgroundImage="url(/images/spaceship/bg-galaxy.png), linear-gradient(180deg, rgba(41, 42, 64, 0.6) 5%, rgba(0, 0, 0, 0.215) 59.01%, rgba(0, 0, 0, 0.5) 100%)"
      bgRepeat="no-repeat"
      bgPos={["65% 100%", "45% 100%", "35% 100%", "20% 100%", "0% 100%"]}
      bgSize="cover"
    >
      <Box px={[4, 0]} pt={12} w="full" maxW="1200px">
        <TabPage tabs={spaceshipTabs} />
      </Box>
      <Box py={[28, 28, 32, 32, 32]} maxW="1200px" w="full">
        <Flex mb={[48, 48, 48, 48, 56]} justify="space-between" align="center">
          <Box flex={2}>
            <Text fontSize="lg" color="whiteAlpha.700" fontWeight={600} mb={2}>
              Week {activeData.week}
            </Text>
            <Heading fontWeight={600} mb={4} fontSize="4xl" textTransform={"uppercase"}>
              {activeData.title}
            </Heading>
            <Text fontWeight={600} color="neutral.100" mb={4} fontSize="lg">
              {activeData.mainDescription}
            </Text>
            <Text color="neutral.100" mb={16} fontSize="lg">
              {activeData.additionalDescription}
            </Text>
            <Button onClick={() => router.push({ query: { tab: "claim" } })} size="lg" letterSpacing="1px">
              CLAIM LOOTBOX
            </Button>
          </Box>
          <Flex pos="relative" flexDir="column" align="flex-end" ml={8} p={4} flex={3}>
            <Image src={activeData.image || ""} alt={activeData.title} width={480} height={340} quality={100} />
          </Flex>
        </Flex>
        <Timeline mappedData={mappedData} />
        <TutorialSpaceship />
      </Box>
    </Flex>
  )
}
