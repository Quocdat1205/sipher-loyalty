import { FC } from "react"
import { Box, Divider, Flex, Img, Stack, Text } from "@sipher.dev/sipher-ui"

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
    <Flex w="full" h="100vh">
      <Box bg="neutral.700" py={16} px={8} w="30rem">
        <Flex align="center" justify="center" w="full" mb={16}>
          <Img src="/images/auth/SIPHER.svg" alt="Sipher" h="2rem" />
          <Box h="2.5rem" w="1px" bg="neutral.600" mx={8} />
          <Img src="/images/auth/ATHER.svg" alt="Sipher" h="3rem" />
        </Flex>
        {children}
      </Box>
      <Flex flex={1} py={16} px={8} justify="center">
        <Box w="full" maxW="800px">
          <Text fontSize={"2xl"} fontWeight={600}>
            Get your Ather Account and start earning rewards
          </Text>
          <Divider my={6} />
          <Stack spacing={4}>
            {content.map(item => (
              <Box key={item.title}>
                <Flex align="center">
                  <Flex justify="center" w="2rem">
                    <Img src={item.iconPath} mr={4} h={item.h} />
                  </Flex>
                  <Text fontSize={"lg"} fontWeight={600}>
                    {item.title}
                  </Text>
                </Flex>
                <Text>{item.description}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
