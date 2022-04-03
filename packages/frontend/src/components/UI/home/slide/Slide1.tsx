import React from "react"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

export const Slide1 = () => {
  const router = useRouter()

  return (
    <Flex maxH="35rem" flexDir="column" align="center" justify="center" pos="relative" w="full">
      <Img objectFit="cover" src="/images/home/banner_home1.png" alt="slide1" w="full" h="full" minH="14rem" />
      <Box pos="absolute" w="full" h="full" maxW="1200px">
        <Box px={[4, 4, 4, 0, 0]} textAlign="center" pos="absolute" top="50%" left="0%" transform="translateY(-50%)">
          <Heading fontSize="4xl" fontWeight={600}>
            SPACESHIP ASTERO
          </Heading>
          <Text lineHeight={1.2} color="whiteAlpha.700" fontSize="xl">
            LOOTBOXES ARE READY TO BE
          </Text>
          <Text lineHeight={1.2} color="whiteAlpha.700" fontSize="xl" mb={[2, 2, 6]}>
            MINTED AND TRADEABLE
          </Text>
          <Button
            onClick={() => router.push("/spaceship")}
            bg="transparent"
            border="1px"
            borderColor="white"
            size="lg"
            variant="secondary"
            _hover={{ bg: "none" }}
          >
            EXPLORER
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}
