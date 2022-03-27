import { chakra, Flex, Spinner, Text } from "@sipher.dev/sipher-ui"
import { AuthType, SignUpAction } from "@store"

import { ChakraModal } from "@components/shared"

import { useSignUpContext } from "./useSignUp"

const ConnectingWallet = () => {
  const { flowState } = useSignUpContext()
  return (
    <ChakraModal
      title={"CONNECT YOUR WALLET"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignUp && flowState.action === SignUpAction.ConnectingWallet}
      hideCloseButton={true}
    >
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
