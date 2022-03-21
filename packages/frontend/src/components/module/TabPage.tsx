import { useRouter } from "next/router"
import { Flex, HStack, Text } from "@sipher.dev/sipher-ui"

interface TabPageProps {
  tabs: Record<"label" | "name", string>[]
}

const TabPage = ({ tabs }: TabPageProps) => {
  const router = useRouter()
  const currentTab = router.query.tab || "all"

  return (
    <HStack spacing={8} overflow="hidden" borderBottom="1px" borderColor="neutral.700">
      {tabs.map(tab => (
        <Flex
          key={tab.name}
          align="center"
          py={2}
          borderBottom="2px"
          borderColor={currentTab === tab.name ? "accent.600" : "transparent"}
          onClick={() => router.push({ query: { tab: tab.name } })}
          cursor="pointer"
        >
          <Text fontWeight={600} color={currentTab === tab.name ? "neutral.50" : "neutral.400"}>
            {tab.label}
          </Text>
        </Flex>
      ))}
    </HStack>
  )
}

export default TabPage
