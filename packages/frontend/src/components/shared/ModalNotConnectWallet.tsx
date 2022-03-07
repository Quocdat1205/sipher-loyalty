import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import ConnectWallet from "@components/UI/navbar/ConnectWallet";
import { useMetaMask } from "@hooks";

const ModalNotConnectWallet = () => {
  const { connect } = useMetaMask();

  const Test = async () => {
    try {
      await connect();
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent bg="#292A40">
        <ModalHeader color="text.primary">Connect wallet</ModalHeader>
        <ModalBody>
          <ConnectWallet
            text="MetaMask"
            href="/images/general/icon_metamask.png"
            onClick={() => Test()}
          />
          <ConnectWallet
            text="WalletConnect"
            href="/images/general/icon_trust.png"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalNotConnectWallet;
