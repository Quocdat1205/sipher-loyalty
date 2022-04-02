import { BiArrowBack } from "react-icons/bi"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

const NotFoundUI = () => {
  const router = useRouter()
  return (
    <Box pos="relative" h="100vh">
      <Img
        zIndex={1}
        pos="absolute"
        w="full"
        h="full"
        src="/images/404/404bg.png"
        alt="Not Found Background"
        objectFit="fill"
      />
      <Flex
        w="full"
        h="full"
        align="center"
        justify="center"
        p={4}
        bgGradient={"radial(rgba(18, 19, 30, 0.6), black)"}
        pos="relative"
        zIndex={2}
      >
        <Flex direction="column" align="center" maxW="56rem">
          <Box pos="relative" textAlign="center" mb={32}>
            <Img src="/images/404/404.gif" alt="Not Found" maxH="26rem" />
            <Box pos="absolute" top="50%" left="50%" transform="translate(-50%,-20%)">
              <Img src="/images/404/404model.png" alt="Not Found" maxH="26rem" />
            </Box>
          </Box>
          <Heading mb={4} fontSize="7xl" fontWeight={900}>
            PAGE NOT FOUND
          </Heading>
          <Text color="neutral.400" textAlign="center" fontSize={"lg"} mb={8}>
            OOPS! THE PAGE YOU'RE LOOKING FOR IS EITHER NOT AVAILABLE, LOADING INCORRECRLY, OR HAS BEEN LOST SOMEWHERE
            IN THE METAVERSE.
          </Text>
          <Button
            color="neutral.900"
            leftIcon={<BiArrowBack size="1.2rem" />}
            backgroundColor="accent.500"
            size="large"
            px={4}
            py={3}
            onClick={() => router.push("/")}
            cursor="pointer"
            textTransform="uppercase"
          >
            Return Home
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
export default NotFoundUI
