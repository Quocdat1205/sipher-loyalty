import React from "react"
import { Box, Flex } from "@sipher.dev/sipher-ui"

import Carousel3D from "../Carousel3D"

import { useClaim } from "./useClaim"

export const ClaimContainer = () => {
  const { claimDataElement, goToSlide } = useClaim()

  return (
    <Flex
      pos="relative"
      bg="url(/images/spaceship/bg-claim.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
      flexDir="column"
      align="center"
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient="linear(180deg, #1B1C27 0%, rgba(27, 28, 39, 0) 52.08%, #1B1C27 100%)"
      />
      <Box zIndex={2} maxW="1200px" w="full">
        <Box h="600px" w="80%" m="0 auto">
          <Carousel3D slides={claimDataElement} goToSlide={goToSlide} offsetRadius={2} showNavigation={false} />
        </Box>
      </Box>
    </Flex>
  )
}
