import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Content = () => {
  return (
    <Box
      w="100%"
      height="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text textTransform="uppercase" color="text.gray" fontSize="2rem">
        Comming soon
      </Text>
    </Box>
  );
};

export default Content;
