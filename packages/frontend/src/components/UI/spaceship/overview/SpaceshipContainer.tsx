import React from "react"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

import TabPage from "@components/module/TabPage"
import { videos } from "@components/UI/portfolio/nft/NFTCard"

import { spaceshipTabs } from ".."

import { Timeline } from "./Timeline"
import { TutorialSpaceship } from "./TutorialSpaceship"
import useOverview from "./useOverview"

export const SpaceshipContainer = () => {
  const { mappedData, activeData } = useOverview()
  const router = useRouter()

  return (
    <Flex flexDir="column" w="full">
      <Flex
        px={[4, 4, 4, 0, 0]}
        bgImage="url(/images/spaceship/bg-overview.jpg)"
        bgSize="cover"
        bgRepeat="no-repeat"
        flexDir="column"
        align="center"
        w="full"
        pos="relative"
      >
        <Box pt={12} w="full" maxW="1200px">
          <TabPage tabs={spaceshipTabs} />
        </Box>
        <Box maxW="1200px" w="full">
          <Flex flexDir={["column", "column", "row"]} justify="space-between" align="center">
            <Box py={[8, 8, 12, 12, 28]} flex={2}>
              <Flex>
                <Text
                  borderBottom="4px"
                  borderColor="accent.500"
                  fontSize="lg"
                  color="whiteAlpha.900"
                  fontWeight={600}
                  mb={2}
                >
                  WEEK {activeData.week}
                </Text>
              </Flex>
              <Heading fontWeight={600} mb={4} fontSize="5xl" textTransform={"uppercase"}>
                {activeData.title}
              </Heading>
              <Text color="neutral.100" mb={4} fontSize="lg" maxW={"36rem"}>
                {activeData.mainDescription}
              </Text>
              <Text color="neutral.100" mb={16} fontSize="lg" maxW={"36rem"}>
                {activeData.additionalDescription}
              </Text>
              <Button onClick={() => router.push({ query: { tab: "claim" } })} size="lg" letterSpacing="1px">
                CLAIM LOOTBOX
              </Button>
            </Box>
            <Flex
              sx={{ video: { maxH: "24rem" } }}
              maxH="26rem"
              blendMode="lighten"
              pos="relative"
              flexDir="column"
              align="flex-end"
              p={4}
              flex={2}
            >
              {videos.includes(activeData.image.split(".")[1]) ? (
                <video src={activeData.image} autoPlay loop muted datatype="video/mp4"></video>
              ) : (
                <Img
                  objectFit="contain"
                  h="full"
                  src={activeData.image ?? "/images/spaceship/ship/1.png"}
                  alt={activeData.title}
                />
              )}
            </Flex>
          </Flex>
          <Box mt={16}>
            <Timeline mappedData={mappedData} />
          </Box>
        </Box>
      </Flex>
      <Flex px={[4, 4, 4, 0, 0]} flexDir="column" align="center" w="full" pos="relative">
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bgGradient="linear(150deg, #8A31E2 -125%, #0F041A 40%)"
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <Box zIndex={2} maxW="1200px" w="full">
          <TutorialSpaceship />
        </Box>
      </Flex>
    </Flex>
  )
}
