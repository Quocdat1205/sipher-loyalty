import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"

import { spaceshipTabs } from ".."

import { Timeline } from "./Timeline"
import { TutorialSpaceship } from "./TutorialSpaceship"
import useOverview from "./useOverview"

export const SpaceshipContainer = () => {
  const { mappedData, activeData } = useOverview()
  const router = useRouter()

  return (
    <Flex
      flexDir="column"
      w="full"
      // backgroundImage="url(/images/spaceship/bg-galaxy.png), linear-gradient(180deg, rgba(41, 42, 64, 0.6) 5%, rgba(0, 0, 0, 0.215) 59.01%, rgba(0, 0, 0, 0.5) 100%)"
      // bgRepeat="no-repeat"
      // bgPos={["65% 100%", "45% 100%", "35% 100%", "20% 100%", "0% 100%"]}
      // bgSize="cover"
    >
      <Flex
        px={[4, 4, 4, 0, 0]}
        flexDir="column"
        align="center"
        bgGradient="linear(150.21deg, #8A31E2 -125.9%, #0F041A 45%)"
        w="full"
      >
        <Box maxW="1200px" w="full">
          <Box pt={12} w="full" maxW="1200px">
            <TabPage tabs={spaceshipTabs} />
          </Box>
          <Flex py={28} justify="space-between" align="center">
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
        </Box>
      </Flex>
      <Flex px={[4, 4, 4, 0, 0]} flexDir="column" align="center" w="full" pos="relative">
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bgGradient="linear(150.21deg, #8A31E2 -125.9%, #0F041A 45%)"
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <Box maxW="1200px" w="full">
          <Timeline mappedData={mappedData} />
          <TutorialSpaceship />
        </Box>
      </Flex>
    </Flex>
  )
}
