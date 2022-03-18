import React, { MouseEvent } from "react"
import { useRouter } from "next/router"
import { Box, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

interface TabPageProps {
  tabs: { text: string; path: string }[]
}

const TabPage = ({ tabs }: TabPageProps) => {
  const router = useRouter()
  const currentPath = router.pathname.split("/")[2]?.toLowerCase()

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, path: string) => {
    e.preventDefault()
    router.push(`${path.toLowerCase()}`)
  }

  return (
    <Box>
      <HStack spacing={8} overflow="hidden" borderBottom="1px" borderColor="neutral.700">
        {tabs.map(tab => (
          <Flex
            key={tab.text}
            align="center"
            py={2}
            borderBottom="2px"
            borderColor={currentPath === tab.path.split("/")[2] ? "accent.600" : "transparent"}
            onClick={e => handleClick(e, tab.path)}
            cursor="pointer"
          >
            <Text fontWeight={600} color={currentPath === tab.path.split("/")[2] ? "neutral.50" : "neutral.400"}>
              {tab.text}
            </Text>
          </Flex>
        ))}
      </HStack>
    </Box>
  )
}

export default TabPage
