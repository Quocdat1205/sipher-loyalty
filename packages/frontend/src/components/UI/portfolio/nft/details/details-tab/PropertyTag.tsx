import { Text, VStack } from "@sipher.dev/sipher-ui"

interface PropertyTagProps {
  trait_type: string
  value: string
  percentage: number
}

const PropertyTag = ({ trait_type, value, percentage }: PropertyTagProps) => {
  return (
    <VStack rounded="base" bg="neutral.600" p={2} spacing={0}>
      <Text
        textTransform="capitalize"
        color="yellow.200"
        fontSize={"sm"}
        w="full"
        textAlign={"center"}
        isTruncated
        title={trait_type.toUpperCase()}
      >
        {trait_type}
      </Text>
      <Text color="neutral.50" textTransform="capitalize" w="full" textAlign={"center"} isTruncated title={value}>
        {value}
      </Text>
      <Text fontWeight={600} fontSize={"xs"} color="neutral.400">
        {percentage}%
      </Text>
    </VStack>
  )
}

export default PropertyTag
