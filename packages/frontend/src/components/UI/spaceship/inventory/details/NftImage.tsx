import { useRef, useState } from "react"
import { BiFullscreen } from "react-icons/bi"
import Image from "next/image"
import {
  Box,
  BoxProps,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useOutsideClick,
} from "@sipher.dev/sipher-ui"

interface NftImageProps extends BoxProps {
  isFetching: boolean
  windowHeight?: number
  src?: string
  alt?: string
}

export const NftImage = ({ isFetching, windowHeight, src, alt, ...rest }: NftImageProps) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState("")
  const boxRef = useRef(null)

  useOutsideClick({
    ref: boxRef,
    handler: () => setIsOpen(""),
  })

  return (
    <Skeleton h="full" isLoaded={isFetching || isImgLoaded} sx={{ span: { rounded: "md" } }}>
      <Flex align="center" justify="center" h="full" {...rest}>
        <Box maxW="36rem" pos="relative">
          <Image
            src={src || "/"}
            alt={alt}
            width={windowHeight ? ((windowHeight - 200) * 644) / 722 : 500}
            height={windowHeight ? windowHeight - 200 : 574}
            onLoad={() => setIsImgLoaded(true)}
          />
          <HStack pos="absolute" bottom="0" right="0" transform="translate(-1rem, -1.5rem)">
            {/* <IconButton
              onClick={() => setIsOpen("CHANGE_PICTURE")}
              size="lg"
              color="white"
              bg="rgba(41, 42, 64, 0.6)"
              aria-label="resize"
              _focus={{ boxShadow: "none" }}
              _hover={{ bg: "accent.600", color: "neutral.900" }}
              icon={<CgProfile size="1.4rem" />}
            /> */}
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
          </HStack>
        </Box>
      </Flex>
      <Modal isOpen={isOpen === "FULL_SCREEN"} onClose={() => setIsOpen("")} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent boxShadow="none" p={0} background="transparent">
          <ModalBody p={0} display="flex" justifyContent="center">
            <Flex direction="column" align={"flex-end"}>
              <ModalCloseButton pos="static" mb={2} _focus={{ shadow: "none" }} rounded="full" />
              <Box sx={{ span: { rounded: "md" } }}>
                <Image src={src || "/"} alt={alt} width={550} height={640} />
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Skeleton>
  )
}
