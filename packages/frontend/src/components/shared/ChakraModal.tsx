import {
  Flex,
  Heading,
  HeadingProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
} from "@sipher.dev/sipher-ui"

interface ChakraModalProps extends Omit<ModalProps, "onClose"> {
  isOpen: boolean
  onClose?: () => void
  hideCloseButton?: boolean
  title: string
  children: React.ReactNode
  titleProps?: HeadingProps
  styleProps?: ModalContentProps
}

export const ChakraModal = ({
  isOpen,
  onClose,
  hideCloseButton = false,
  title,
  children,
  size = "xl",
  titleProps = { fontSize: "md" },
  styleProps = {
    bg: "neutral.700",
  },
  ...props
}: ChakraModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose && onClose()}
      size={size}
      isCentered
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay bg="blackAlpha.400" />
      <ModalContent pos="relative" overflow={"hidden"} {...styleProps}>
        <Flex backdropFilter="blur(20px)" px={6} pt={6} w="full" justify="space-between" align="center" mb={2}>
          <Heading fontWeight={600} {...titleProps}>
            {title}
          </Heading>
          {!hideCloseButton && (
            <ModalCloseButton color="neutral.400" _focus={{ shadow: "none" }} position="static" size="sm" />
          )}
        </Flex>
        <ModalBody px={0} pb={6}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
