import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

interface Props {
  children: React.ReactNode;
  active: boolean;
  path: string;
}

const ListNavBar = ({ children, active, path }: Props) => {
  const router = useRouter();

  return (
    <Box
      height="100%"
      margin="0 1rem"
      cursor="pointer"
      onClick={() => {
        router.push(path);
      }}
    >
      <Text
        color={active ? "text.primary" : `text.gray`}
        textTransform="uppercase"
        borderBottom={active ? "1px solid #F4B433" : ""}
        fontWeight="bold"
      >
        {children}
      </Text>
    </Box>
  );
};

export { ListNavBar };
