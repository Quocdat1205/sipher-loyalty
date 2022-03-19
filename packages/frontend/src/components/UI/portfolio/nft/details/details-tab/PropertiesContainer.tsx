import { MdInfo } from "react-icons/md"
import { Box, Flex, Text, Wrap, WrapItem } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "@components/shared"

import PropertyTag from "./PropertyTag"

interface PropertiesProps {
  attributes?: any[]
}
const soulBoundData = ["weapon", "hand", "head", "sub-race", "costume"]

const PropertiesContainer = ({ attributes = [] }: PropertiesProps) => {
  return (
    <Box mb={4}>
      <Flex mb={4} align="center">
        <Text fontWeight={600} color="grey.50">
          Properties
        </Text>
        <Text ml={2} bg="neutral.600" py={0.5} px={1} rounded="sm">
          Genesis
        </Text>
      </Flex>
      <Box mb={2}>
        <Flex align="center">
          <Text fontWeight={600} color="grey.50">
            Soul-bound
          </Text>
          <CustomPopover
            label="Soul-bound"
            icon={
              <Box ml={2} color="neutral.500">
                <MdInfo size="1.2rem" />
              </Box>
            }
          >
            <Text color="neutral.900">
              Soul-bound properties are stuck forever with this Character NFT but you can change them ingame for playing
              game.
            </Text>
          </CustomPopover>
        </Flex>
        <Wrap w="full" py={4} spacing={4}>
          {attributes
            .filter(i => soulBoundData.includes(i.trait_type))
            .map(data => (
              <WrapItem key={data.trait_type}>
                <PropertyTag {...data} />
              </WrapItem>
            ))}
        </Wrap>
      </Box>
      <Box mb={2}>
        <Flex align="center">
          <Text fontWeight={600} color="grey.50">
            Separate
          </Text>
          <CustomPopover
            label="Separate"
            icon={
              <Box ml={2} color="neutral.500">
                <MdInfo size="1.2rem" />
              </Box>
            }
          >
            <Text color="neutral.400">Separate properties can't be changed ingame.</Text>
          </CustomPopover>
        </Flex>
        <Wrap w="full" py={4} spacing={4}>
          {attributes
            .filter(i => !soulBoundData.includes(i.trait_type))
            .map(data => (
              <WrapItem key={data.trait_type}>
                <PropertyTag {...data} />
              </WrapItem>
            ))}
        </Wrap>
      </Box>
    </Box>
  )
}
export default PropertiesContainer
