import React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const GroupCard = ({ children }: Props) => {
  return (
    <Box
      paddingBottom="0.8rem"
      borderBottom="1px solid #45465E"
      width="100%"
      marginTop="1rem"
    >
      {children}
    </Box>
  );
};

export const Card = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginTop="1rem"
    >
      {children}
    </Box>
  );
};
