import {
  Flex,
  Heading,
  HeadingProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@sipher.dev/sipher-ui"

interface ChakraModalProps extends ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  titleProps?: HeadingProps
}

export const ChakraModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "xl",
  titleProps = { fontSize: "md" },
  ...props
}: ChakraModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} {...props}>
      <ModalOverlay />
      <ModalContent bg="neutral.700" overflow={"hidden"}>
        <Flex px={6} pt={6} w="full" justify="space-between" align="center" mb={2}>
          <Heading fontWeight={600} {...titleProps}>
            {title}
          </Heading>
          <ModalCloseButton color="neutral.400" _focus={{ shadow: "none" }} position="static" size="sm" />
        </Flex>
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
