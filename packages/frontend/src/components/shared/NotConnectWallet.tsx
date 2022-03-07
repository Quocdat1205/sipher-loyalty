import React from "react";
import { Box, Image } from "@chakra-ui/react";
import ModalNotConnectWallet from "./ModalNotConnectWallet";
import { IndexPage } from "@components/shared/Heading";

const NotConnectWallet = () => {
  return (
    <Box>
      <IndexPage title="Connect metamask" />
      <Box className="banner" width="100%" height="60vh">
        <Image src="/images/general/dashboard-banner.jpg" />
      </Box>
      <ModalNotConnectWallet />
    </Box>
  );
};

export default NotConnectWallet;
