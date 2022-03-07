import React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  active: boolean;
}

const CardSelection = ({ children, active }: Props) => {
  return (
    <Box
      width="100%"
      display="flex"
      color="white"
      cursor="pointer"
      padding="0.5rem 1rem"
      bg={active ? "#21212E" : ""}
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default CardSelection;
