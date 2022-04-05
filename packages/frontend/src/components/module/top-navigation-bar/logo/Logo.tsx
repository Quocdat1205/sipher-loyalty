import Link from "next/link"
import { Box, Flex, HStack, Img, Text } from "@sipher.dev/sipher-ui"

import ATHER from "./ather.svg"
import LOGO from "./logo.svg"
import SIPHER from "./SIPHER.svg"

const Logo = () => {
  return (
    <HStack pb={2} align="center" spacing={[2, 4, 6]}>
      <Link href="/" passHref>
        <HStack spacing={2} align="center" cursor={"pointer"}>
          <Box>
            <Img src={LOGO} alt="LOGO" h="2.5rem" />
          </Box>
          <Box>
            <Img src={ATHER} alt="SIPHER ATHER LOGO" h="2.5rem" />
          </Box>
        </HStack>
      </Link>
      <Link href="/" passHref>
        <Flex overflow="hidden" h="2.5rem" direction="column" cursor={"pointer"}>
          <Img h="1.4rem" src={SIPHER} alt="SIPHER LOYALTY LOGO" />
          <Flex mt="2px" w="full" justify="space-between" px={0.5}>
            {"DASHBOARD".split("").map((letter, idx) => (
              <Text color="white" key={`${letter}-${idx}`} fontSize="xs">
                {letter}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Link>
    </HStack>
  )
}

export default Logo
