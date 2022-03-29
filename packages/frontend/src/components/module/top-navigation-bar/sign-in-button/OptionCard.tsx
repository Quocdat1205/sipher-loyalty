import { Box, Flex, FlexProps, Text } from "@sipher.dev/sipher-ui"

interface OptionCardProps extends FlexProps {
  name: string
  icon?: React.ReactNode
  onClick?: () => void
}

const OptionCard = ({ children, name, icon, onClick, ...rest }: OptionCardProps) => {
  return (
    <Flex
      role="group"
      rounded="base"
      p={2}
      cursor="pointer"
      w="full"
      _hover={{ bg: "neutral.600" }}
      align="center"
      onClick={onClick}
      {...rest}
    >
      <Box color="neutral.400" _groupHover={{ color: "white" }}>
        {icon}
      </Box>
      <Text color="neutral.50" _groupHover={{ color: "white", fontWeight: 600 }} ml={4}>
        {name}
      </Text>
      {children}
    </Flex>
  )
}

export default OptionCard
