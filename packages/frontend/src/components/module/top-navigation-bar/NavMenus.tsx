import { useRouter } from "next/router"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

interface NavMenusProps {
  menus: {
    path: string
    label: string
  }[]
}

const NavMenus = ({ menus }: NavMenusProps) => {
  const router = useRouter()
  const currentPath = router.pathname.split("/")[1]
  return (
    <HStack h="full" align="center" spacing={[4, 4, 8, 12]} display={"flex"}>
      {menus.map(item => (
        <Flex h="full" align="center" key={item.path} pos="relative">
          <Text
            cursor="pointer"
            onClick={() => router.push(item.path)}
            fontWeight={600}
            color={currentPath === item.path.split("/")[1] ? "neutral.50" : "neutral.300"}
          >
            {item.label}
          </Text>
          <Box
            pos="absolute"
            display={currentPath === item.path.split("/")[1] ? "block" : "none"}
            bottom={0}
            left={0}
            borderRadius="2px 2px 0px 0px"
            h="2px"
            w="full"
            background={"accent.500"}
          />
        </Flex>
      ))}
    </HStack>
  )
}

export default NavMenus
