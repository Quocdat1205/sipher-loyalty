import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

interface SlideFrameProps {
  title: string
  description: string
  srcBg: string
  buttonText: string
  destination: string
}

const SlideFrame = ({ title, description, srcBg, buttonText, destination }: SlideFrameProps) => {
  const router = useRouter()

  return (
    <Flex maxH="35rem" flexDir="column" align="center" justify="center" pos="relative" w="full">
      <Img objectFit="cover" src={srcBg} alt="slide1" w="full" h="full" minH="14rem" />
      <Box pos="absolute" w="full" h="full" maxW="1200px">
        <Flex
          direction={"column"}
          align="center"
          px={[4, 4, 4, 0, 0]}
          pos="absolute"
          top="50%"
          left="0%"
          transform="translateY(-50%)"
        >
          <Heading fontSize="5xl" fontWeight={600} mb={2} textTransform="uppercase">
            {title}
          </Heading>
          <Text
            lineHeight={1.2}
            maxW="34rem"
            color="whiteAlpha.700"
            fontSize="xl"
            fontWeight={600}
            textTransform="uppercase"
            textAlign={"center"}
          >
            {description}
          </Text>
          <Button
            mt={12}
            onClick={() => router.push(destination)}
            bg="transparent"
            border="1px"
            borderColor="white"
            size="lg"
            fontSize={"xl"}
            py={8}
            px={16}
            variant="secondary"
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
          >
            {buttonText}
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SlideFrame
