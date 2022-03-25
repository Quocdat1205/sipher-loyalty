import { BiRefresh } from "react-icons/bi"
import { ButtonGroup, HStack, IconButton } from "@sipher.dev/sipher-ui"

import { useDetailContext } from "./useDetail"

const HeartAndView = () => {
  const { revalidate } = useDetailContext()

  return (
    <HStack spacing={6}>
      {/* <Flex align="center">
        <Text mr={2}>{views.toLocaleString()}</Text>
        <Box color="neutral.600">
          <BsEyeFill />
        </Box>
      </Flex> */}
      <ButtonGroup spacing={2} size="sm">
        {/* <Flex align="center">
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
        </Flex> */}
        <IconButton
          onClick={revalidate}
          size="md"
          rounded="full"
          aria-label="reload"
          color="neutral.50"
          bg="neutral.700"
          icon={<BiRefresh size="1.2rem" />}
          _hover={{ bg: "accent.600", color: "neutral.900" }}
          _focus={{ boxShadow: "none" }}
        />
        {/* <IconButton
          size="md"
          rounded="full"
          aria-label="share"
          color="neutral.50"
          bg="neutral.700"
          icon={<IoMdShare size="1.2rem" />}
          _hover={{ bg: "accent.600", color: "neutral.900" }}
          _focus={{ boxShadow: "none" }}
        /> */}
      </ButtonGroup>
    </HStack>
  )
}

export default HeartAndView
