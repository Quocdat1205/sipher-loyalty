import { BsFillCaretDownFill } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import ATHER from "./ather.svg"
import LOGO from "./logo.svg"
import SIPHER from "./SIPHER.svg"

const Logo = () => {
  return (
    <HStack align="center" spacing={6}>
      <Link href="/" passHref>
        <HStack spacing={2} align="center" cursor={"pointer"}>
          <Box>
            <Image src={LOGO} alt="LOGO" height={30.3 * 1.6} width={30.52 * 1.6} layout="fixed" priority />
          </Box>
          <Box>
            <Image
              src={ATHER}
              alt="SIPHER ATHER LOGO"
              height={22.65 * 1.6}
              width={43.9 * 1.6}
              layout="fixed"
              priority
            />
          </Box>
          <Box color="neutral.400">
            <BsFillCaretDownFill size="1.6rem" />
          </Box>
        </HStack>
      </Link>
      <Link href="/" passHref>
        <Flex direction="column" cursor={"pointer"}>
          <Image src={SIPHER} alt="SIPHER LOYALTY LOGO" height={23.87} width={123.07} layout="fixed" priority />
          <Flex w="full" justify="space-between" px={0.5}>
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
