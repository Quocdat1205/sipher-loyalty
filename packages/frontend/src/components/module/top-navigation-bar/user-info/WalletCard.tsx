import { Fragment } from "react"
import { Flex, Img, Text } from "@sipher.dev/sipher-ui"

interface WalletCardProps {
  isModal?: boolean
  isPopular?: boolean
  src: string
  text: string
  onClick: () => void
}

export const WalletCard = ({ isModal = false, isPopular = false, src, text, onClick }: WalletCardProps) => {
  return (
    <Flex
      role="group"
      align="center"
      flex={1}
      px={4}
      py={4}
      rounded="base"
      bg="neutral.600"
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: "accent.600" }}
      _active={{ bg: "blackAlpha.900" }}
      onClick={onClick}
      justify="space-between"
      transition="all 0.2s ease-in-out"
    >
      {isModal ? (
        <Fragment>
          <Text _groupHover={{ color: "black" }} fontWeight={600}>
            {text}
          </Text>
          <Img src={src} alt={text} boxSize="2rem" />
        </Fragment>
      ) : (
        <Fragment>
          <Flex align="center">
            <Img src={src} alt={text} boxSize="2rem" />
            <Text _groupHover={{ color: "black" }} ml={4} fontWeight={600}>
              {text}
            </Text>
          </Flex>
          {isPopular && <Text _groupHover={{ color: "black" }}>Popular</Text>}
        </Fragment>
      )}
    </Flex>
  )
}
