import { BiRefresh } from "react-icons/bi"
import { BsEyeFill, BsHeartFill } from "react-icons/bs"
import { FaBalanceScale } from "react-icons/fa"
import { IoMdShare } from "react-icons/io"
import { useQueryClient } from "react-query"
import { Box, ButtonGroup, Flex, HStack, IconButton, Text } from "@sipher.dev/sipher-ui"

interface HeartAndViewProps {
  likes?: number
  views?: number
  contractAddress: string
  tokenId: string
}

const HeartAndView = ({ likes = 0, views = 0, contractAddress, tokenId }: HeartAndViewProps) => {
  const queryClient = useQueryClient()

  const handleRefresh = () => {
    queryClient.invalidateQueries(["character", contractAddress, tokenId])
  }

  return (
    <HStack spacing={6}>
      <Flex align="center">
        <Text mr={2}>{views.toLocaleString()}</Text>
        <Box color="neutral.600">
          <BsEyeFill />
        </Box>
      </Flex>
      <ButtonGroup spacing={2} size="sm">
        <Flex align="center">
          <Text mr={2}>{likes}</Text>
          <IconButton
            size="md"
            rounded="full"
            aria-label="scale"
            color="neutral.600"
            bg="neutral.700"
            icon={<BsHeartFill size="1rem" />}
            colorScheme="accent"
            _hover={{ bg: "accent.600", color: "neutral.900" }}
            _focus={{ boxShadow: "none" }}
          />
        </Flex>
        <IconButton
          size="md"
          rounded="full"
          aria-label="scale"
          color="neutral.50"
          bg="neutral.700"
          icon={<FaBalanceScale size="1.2rem" />}
          _hover={{ bg: "accent.600", color: "neutral.900" }}
          _focus={{ boxShadow: "none" }}
        />
        <IconButton
          onClick={handleRefresh}
          size="md"
          rounded="full"
          aria-label="reload"
          color="neutral.50"
          bg="neutral.700"
          icon={<BiRefresh size="1.2rem" />}
          _hover={{ bg: "accent.600", color: "neutral.900" }}
          _focus={{ boxShadow: "none" }}
        />
        <IconButton
          size="md"
          rounded="full"
          aria-label="share"
          color="neutral.50"
          bg="neutral.700"
          icon={<IoMdShare size="1.2rem" />}
          _hover={{ bg: "accent.600", color: "neutral.900" }}
          _focus={{ boxShadow: "none" }}
        />
      </ButtonGroup>
    </HStack>
  )
}

export default HeartAndView
