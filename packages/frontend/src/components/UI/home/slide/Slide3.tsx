import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading } from "@sipher.dev/sipher-ui"

export const Slide3 = () => {
  const router = useRouter()

  return (
    <Flex align="center" justify="center" pos="relative" h={["6rem", "16rem", "17.5rem", "19rem", "20rem"]} w="full">
      <Image priority objectFit="cover" quality={100} src="/images/airdrops/banner.png" alt="slide3" layout="fill" />
      <Box pos="relative" w="full" h="full" maxW="1200px" display={["none", "block"]}>
        <Box px={[4, 4, 4, 0, 0]} textAlign="center" pos="absolute" top="50%" left="0%" transform="translateY(-50%)">
          <Heading mb={8} fontSize="4xl" fontWeight={600}>
            SIPHER AIRDROPS
          </Heading>
          <Button
            onClick={() => router.push("/airdrop")}
            bg="transparent"
            border="1px"
            borderColor="white"
            size="lg"
            variant="secondary"
            _hover={{ bg: "none" }}
          >
            CHECK IT OUT
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}
