import React from "react"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Img } from "@sipher.dev/sipher-ui"

export const Slide2 = () => {
  const router = useRouter()

  return (
    <Flex maxH="35rem" flexDir="column" align="center" justify="center" pos="relative" w="full">
      <Img objectFit="cover" src="/images/home/banner_home2.png" alt="slide2" w="full" h="full" minH="14rem" />
      <Box pos="absolute" w="full" h="full" maxW="1200px">
        <Box px={[4, 4, 4, 0, 0]} textAlign="center" pos="absolute" top="50%" left="0%" transform="translateY(-50%)">
          <Heading mb={[2, 2, 6]} fontSize="4xl" fontWeight={600}>
            EXCLUSIVE SCULPTURES
          </Heading>
          <Button
            onClick={() => router.push("/portfolio")}
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
