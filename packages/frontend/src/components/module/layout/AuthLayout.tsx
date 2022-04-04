import { FC } from "react"
import Image from "next/image"
import { Box, Flex, Img, Stack, Text } from "@sipher.dev/sipher-ui"

import MobileUI from "./MobileUI"

const content = [
  {
    iconPath: "/images/auth/phone.svg",
    title: "Access to Ather Labs' platforms",
    description: "Your easy and direct portal to any services on Ather Labs",
    h: "20px",
  },
  {
    iconPath: "/images/auth/console.svg",
    title: "Games with one Ather account",
    description: "Play your favorite games from Ather Labs with only one account",
    h: "15px",
  },
  {
    iconPath: "/images/auth/rocket.svg",
    title: "Enjoy extra benefits",
    description: "Enjoy extra special benefits dedicated to Ather Labs members",
    h: "20px",
  },
  {
    iconPath: "/images/auth/gift.svg",
    title: "Exclusive rewards",
    description: "The more you explore, the more rewards you get",
    h: "20px",
  },
]

export const AuthLayout: FC = ({ children }) => {
  return (
    <Flex w="full" h="100vh" pos="relative">
      <Flex w="full" display={["none", "none", "flex"]}>
        <Box bg="neutral.700" py={16} px={8} w="30rem" zIndex={2}>
          <Flex align="center" justify="center" w="full" mb={16}>
            <Img src="/images/auth/SIPHER.svg" alt="Sipher" h="2rem" />
            <Box h="2.5rem" w="1px" bg="neutral.600" mx={8} />
            <Img src="/images/auth/ATHER.svg" alt="Sipher" h="3rem" />
          </Flex>
          {children}
        </Box>
        <Image layout="fill" src="/images/auth/background.png" alt="background" />
        <Flex flex={1} py={24} px={[8, 16, 24]} pos="relative" justify="center">
          <Box pos="absolute" bottom={0} right={0} w="44rem" h="50rem">
            <Image src="/images/auth/neko_figure.svg" alt="neko" layout="fill" />
          </Box>
          <Box w="full" maxW="960px" zIndex={2}>
            <Box w="full" maxW="440px" zIndex={2}>
              <Text fontSize={"3xl"} mb={6} fontWeight={600}>
                {`Get your Ather Account & Start earning rewards`}
              </Text>
              <Stack spacing={4}>
                {content.map(item => (
                  <Flex key={item.title} mb={1.5}>
                    <Flex justify="center" w="2rem" color="rgba(255, 255, 255, 0.7)" pt={1}>
                      <Img src={item.iconPath} mr={4} h={item.h} />
                    </Flex>
                    <Box>
                      <Text fontSize={"lg"} fontWeight={600}>
                        {item.title}
                      </Text>
                      <Text color="rgba(255, 255, 255, 0.7)">{item.description}</Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <MobileUI isLogin />
    </Flex>
  )
}
