import { Box, Text } from "@sipher.dev/sipher-ui"
import { AuthType, ChangeWalletAction, useAuthFlowStore } from "@store"

import { ChakraModal } from "@components/shared"

const ChangeAccount = () => {
  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  return (
    <ChakraModal
      title={"CHANGE WALLET"}
      size="lg"
      isOpen={flowState?.type === AuthType.ChangeWallet && flowState.action === ChangeWalletAction.Change}
      onClose={() => setFlowState(null)}
    >
      <Box px={6}>
        <Text>We detect change in your wallet address, please connect this wallet to your account.</Text>
      </Box>
    </ChakraModal>
  )
}

export default ChangeAccount
