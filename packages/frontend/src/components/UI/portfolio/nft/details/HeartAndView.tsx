import { useState } from "react"
import { BiRefresh, BiTransfer } from "react-icons/bi"
import { ButtonGroup, HStack, IconButton, Skeleton } from "@sipher.dev/sipher-ui"

import { TransferModal } from "../../modal"

import { useDetailContext } from "./useDetail"

const HeartAndView = () => {
  const { revalidate, isFetched } = useDetailContext()
  const [modal, setIsModal] = useState("")

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
        <Skeleton rounded="full" isLoaded={isFetched}>
          <IconButton
            onClick={() => setIsModal("TRANSFER")}
            size="md"
            rounded="full"
            aria-label="reload"
            color="neutral.50"
            bg="neutral.700"
            icon={<BiTransfer size="1.2rem" />}
            _hover={{ bg: "accent.600", color: "neutral.900" }}
            _focus={{ boxShadow: "none" }}
          />
          <TransferModal isOpen={modal === "TRANSFER"} onClose={() => setIsModal("")} />
        </Skeleton>
        <Skeleton rounded="full" isLoaded={isFetched}>
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
        </Skeleton>
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
