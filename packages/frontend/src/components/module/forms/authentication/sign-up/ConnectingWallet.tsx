import { chakra, Flex, Spinner, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

const ConnectingWallet = () => {
  return (
    <ChakraModal title={"CONNECT YOUR WALLET"} size="lg" isOpen={true} hideCloseButton={true}>
      <Flex px={6} align="center">
        <Text>
          Please sign the message to link your wallet to your account.{" "}
          <chakra.span>
            <Spinner size="xs" mr={4} />
          </chakra.span>
        </Text>
      </Flex>
    </ChakraModal>
  )
}

export default ConnectingWallet
