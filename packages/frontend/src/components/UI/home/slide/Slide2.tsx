import React from "react"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

const Slide2 = () => {
  const router = useRouter()

  return (
    <Flex
      align="center"
      justify="center"
      pos="relative"
      bg={`url(/images/home/banner2.png)`}
      h={["20rem", "22.5rem"]}
      w="full"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box pos="relative" w="full" maxW="1200px" display={["none", "block"]}>
        <Box textAlign="center" pos="absolute" top="50%" left="0%" transform="translateY(-50%)">
          <Heading fontSize="4xl" fontWeight={600}>
            EXCLUSIVE SCULPTURES
          </Heading>
          <Text lineHeight={1.2} color="whiteAlpha.700" fontSize="xl">
            LOOTBOXES ARE READY TO BE
          </Text>
          <Text lineHeight={1.2} color="whiteAlpha.700" fontSize="xl" mb={6}>
            MINTED AND TRADEABLE
          </Text>
          <Button
            onClick={() => router.push("/portfolio")}
            bg="transparent"
            border="1px"
            borderColor="white"
            size="lg"
            variant="secondary"
          >
            CHECK IT OUT
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}
export default Slide2
