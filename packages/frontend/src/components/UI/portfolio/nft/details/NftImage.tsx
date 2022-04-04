import { useRef, useState } from "react"
import { BiFullscreen } from "react-icons/bi"
import {
  Box,
  BoxProps,
  Flex,
  IconButton,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Text,
  useOutsideClick,
} from "@sipher.dev/sipher-ui"

import { SpLayer } from "@components/shared/icons"
import { videos } from "@components/UI/portfolio/nft/NFTCard"

interface NftImageProps extends BoxProps {
  minable: number
  isFetching: boolean
  src: string
  alt?: string
}

export const NftImage = ({ minable, isFetching, src, alt, ...rest }: NftImageProps) => {
  const [isOpen, setIsOpen] = useState("")
  const boxRef = useRef(null)
  const extension = src ? src.split(".")[5] : ""

  useOutsideClick({
    ref: boxRef,
    handler: () => setIsOpen(""),
  })

  return (
    <Box h="full">
      <Flex align="center" justify="center" h="full" {...rest}>
        <Skeleton
          sx={{ img: { rounded: "lg", overflow: "hidden" }, video: { rounded: "lg", overflow: "hidden" } }}
          isLoaded={isFetching}
          pos="relative"
          w="full"
          maxW="40rem"
        >
          {videos.includes(extension) ? (
            <video src={src} autoPlay loop muted datatype="video/mp4"></video>
          ) : (
            <Img src={src || "/"} alt={alt} objectFit="contain" maxH="46rem" w="full" />
          )}
          <Box pos="absolute" bottom="0" left="0" transform="translate(1rem, -1.5rem)">
            <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white">
              <SpLayer />
              <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
                {minable}
              </Text>
            </Flex>
          </Box>
          <Box pos="absolute" bottom="0" right="0" transform="translate(-1rem, -1rem)">
            <IconButton
              onClick={() => setIsOpen("FULL_SCREEN")}
              size="lg"
              color="white"
              bg="rgba(41, 42, 64, 0.6)"
              _focus={{ boxShadow: "none" }}
              _hover={{ bg: "accent.600", color: "neutral.900" }}
              aria-label="resize"
              icon={<BiFullscreen size="1.4rem" />}
            />
          </Box>
        </Skeleton>
      </Flex>
      <Modal isOpen={isOpen === "FULL_SCREEN"} onClose={() => setIsOpen("")} isCentered size="full">
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent boxShadow="none" p={0} background="transparent">
          <ModalBody pos="relative" w="full" h="full" p={0} display="flex">
            <ModalCloseButton _focus={{ shadow: "none" }} rounded="full" />
            <Box
              maxW="45rem"
              w="full"
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
              sx={{ video: { rounded: "lg" } }}
            >
              {videos.includes(extension) ? (
                <video src={src} autoPlay loop muted datatype="video/mp4"></video>
              ) : (
                <Img objectFit="contain" src={src || "/"} alt={alt} rounded="lg" w="full" />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
