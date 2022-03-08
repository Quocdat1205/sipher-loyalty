import { BiArrowBack } from "react-icons/bi"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Text } from "@sipher.dev/sipher-ui"

import notFoundGif from "./404.gif"
import notFoundBackground from "./404bg.png"
import notFoundModel from "./404model.png"

const NotFoundUI = () => {
  const router = useRouter()
  return (
    <Box h="100vh">
      <Image src={notFoundBackground} alt="Not Found Background" layout="fill" />
      <Flex
        w="full"
        h="full"
        align="center"
        justify="center"
        p={4}
        bgGradient={"radial(rgba(18, 19, 30, 0.9), black)"}
        pos="relative"
        zIndex={"docked"}
      >
        <Flex direction="column" align="center" maxW="56rem">
          <Box pos="relative" textAlign="center" mb={32}>
            <Image src={notFoundGif} alt="Not Found" width={600} height={300} />
            <Box pos="absolute" top="50%" left="50%" transform="translate(-50%,-20%)">
              <Image src={notFoundModel} alt="Not Found" width={219} height={298} />
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
