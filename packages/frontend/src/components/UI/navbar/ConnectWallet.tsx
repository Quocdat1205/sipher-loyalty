import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

interface button {
  href: string;
  text: string;
  onClick?: () => {};
}
const ConnectWallet = ({ href, text, onClick }: button) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="#45465E"
      padding="1rem"
      marginBottom="1rem"
      borderRadius="4px"
      cursor="pointer"
      onClick={onClick}
    >
      <Text color="text.primary">{text}</Text>
      <Image src={href} />
    </Box>
  );
};

export default ConnectWallet;
