import React from "react"
import { Stack } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { WalletCard } from "."

interface ConnectWalletUIProps {
  isModal?: boolean
  onClose?: () => void
}

export const ConnectWalletUI = ({ isModal = false, onClose }: ConnectWalletUIProps) => {
  const { connect } = useWalletContext()

  return (
    <Stack spacing={4} w="full">
      <WalletCard
        isPopular
        isModal={isModal}
        src="/icons/wallets/metamask.svg"
        text="MetaMask"
        onClick={() => {
          connect("injected")
          isModal && onClose && onClose()
        }}
      />
      <WalletCard
        isModal={isModal}
        src="/icons/wallets/walletconnect.svg"
        text="WalletConnect"
        onClick={() => {
          connect("walletConnect")
          isModal && onClose && onClose()
        }}
      />
    </Stack>
  )
}
