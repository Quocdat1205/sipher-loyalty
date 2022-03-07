import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { IoIosLogIn } from "react-icons/io";

const ButtonConnect = () => {
  return (
    <Box
      backgroundImage="/images/general/button_connect.png"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundSize="cover"
      padding="0.5rem 0"
      textAlign="left"
      cursor="pointer"
    >
      <Text color="text.primary" fontWeight="600">
        Link wallet
      </Text>
      <IoIosLogIn />
    </Box>
  );
};

export default ButtonConnect;
