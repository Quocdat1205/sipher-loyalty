import { useRef, useState } from "react"
import { BiFullscreen } from "react-icons/bi"
import Image from "next/image"
import {
  Box,
  BoxProps,
  Flex,
  IconButton,
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
  mintable: number
  isFetching: boolean
  windowHeight?: number
  src: string
  alt?: string
}

export const NftImage = ({ mintable, isFetching, windowHeight, src, alt, ...rest }: NftImageProps) => {
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
          sx={{ span: { rounded: "md" }, video: { rounded: "md" } }}
          isLoaded={isFetching}
          maxW="38rem"
          pos="relative"
        >
          {videos.includes(extension) ? (
            <video src={src} autoPlay loop muted datatype="video/mp4"></video>
          ) : (
            <Image
              src={src || "/"}
              alt={alt}
              width={windowHeight ? ((windowHeight - 200) * 644) / 722 : 500}
              height={windowHeight ? windowHeight - 200 : 574}
            />
          )}
          <Box pos="absolute" bottom="0" left="0" transform="translate(1rem, -2rem)">
            <Flex align="center" py={0.5} px={1.5} rounded="full" bg="white">
              <SpLayer />
              <Text fontSize="xs" color="neutral.900" fontWeight={600}>
                {mintable}
              </Text>
            </Flex>
          </Box>
          <Box pos="absolute" bottom="0" right="0" transform="translate(-1rem, -1.5rem)">
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
      <Modal isOpen={isOpen === "FULL_SCREEN"} onClose={() => setIsOpen("")} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent boxShadow="none" p={0} background="transparent">
          <ModalBody p={0} display="flex" justifyContent="center">
            <Flex direction="column" align={"flex-end"}>
              <ModalCloseButton pos="static" mb={2} _focus={{ shadow: "none" }} rounded="full" />
              <Box sx={{ span: { rounded: "md" }, video: { rounded: "md" } }}>
                {videos.includes(extension) ? (
                  <video src={src} autoPlay loop muted datatype="video/mp4"></video>
                ) : (
                  <Image src={src || "/"} alt={alt} width={550} height={640} />
                )}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
