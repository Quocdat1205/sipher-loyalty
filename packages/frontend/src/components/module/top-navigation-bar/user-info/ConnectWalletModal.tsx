import { Box } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import { ConnectWalletUI } from "."

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  return (
    <ChakraModal isCentered title={"CONNECT WALLET"} isOpen={isOpen} onClose={onClose} size="md">
      <Box pb={4}>
        <ConnectWalletUI isModal onClose={onClose} />
      </Box>
    </ChakraModal>
  )
}
