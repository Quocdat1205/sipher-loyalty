import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

export const Slide1 = () => {
  const router = useRouter()

  return (
    <Flex align="center" justify="center" pos="relative" h={["6rem", "16rem", "18rem", "20rem", "20rem"]} w="full">
      <Image objectFit="cover" quality={100} src="/images/home/banner-home.png" alt="slide1" layout="fill" />
      <Box pos="relative" w="full" h="full" maxW="1200px" display={["none", "block"]}>
        <Box px={[4, 4, 4, 0, 0]} textAlign="center" pos="absolute" top="50%" left="0%" transform="translateY(-50%)">
          <Heading fontSize="4xl" fontWeight={600}>
            SPACESHIP ASTERO
          </Heading>
          <Text lineHeight={1.2} color="whiteAlpha.700" fontSize="xl">
            LOOTBOXES ARE READY TO BE
          </Text>
          <Text lineHeight={1.2} color="whiteAlpha.700" fontSize="xl" mb={6}>
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
