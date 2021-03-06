import { useRouter } from "next/router"
import { Box, Flex, Heading, Img, Text } from "@sipher.dev/sipher-ui"

interface SlideFrameProps {
  title: string
  description: string
  srcBg: string
  destination: string
}

const SlideFrame = ({ title, description, srcBg, destination }: SlideFrameProps) => {
  const router = useRouter()

  return (
    <Flex
      onClick={() => router.push(destination)}
      maxH="35rem"
      flexDir="column"
      align="center"
      justify="center"
      pos="relative"
      w="full"
    >
      <Img objectFit="cover" src={srcBg} alt="slide1" w="full" h="full" minH="14rem" />
      <Box pos="absolute" w="full" h="full" maxW="1200px">
        <Flex direction={"column"} px={[4, 4, 4, 0, 0]} pos="absolute" top="50%" left="0%" transform="translateY(-50%)">
          <Heading fontSize="5xl" fontWeight={600} mb={2} textTransform="uppercase">
            {title}
          </Heading>
          <Text
            lineHeight={1.2}
            maxW="34rem"
            color="whiteAlpha.700"
            fontSize="lg"
            fontWeight={600}
            textTransform="uppercase"
          >
            {description}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SlideFrame
