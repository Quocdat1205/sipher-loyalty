import Image from "next/image"
import Link from "next/link"
import { Flex, Text } from "@sipher.dev/sipher-ui"

import SIPHER from "./SIPHER.svg"

const Logo = () => {
  return (
    <Link href="/" passHref>
      <Flex direction="column" cursor={"pointer"}>
        <Image src={SIPHER} alt="SIPHER MARKETPLACE LOGO" height={23.87} width={123.07} layout="fixed" priority />
        <Flex w="full" justify="space-between" mt={1}>
          {"DASHBOARD".split("").map((letter, idx) => {
            const key = `${letter}-${idx}`
            return (
              <Text key={key} fontFamily="Brandon" fontSize="sm">
                {letter}
              </Text>
            )
          })}
        </Flex>
      </Flex>
    </Link>
  )
}

export default Logo
