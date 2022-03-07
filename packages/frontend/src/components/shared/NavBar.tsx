import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { navbar } from "@utils";
import { ListNavBar } from "@components/UI/navbar/ListNavBar";
import ButtonConnect from "@components/UI/navbar/ButtonConnect";
import { useMetaMask } from "@hooks";
import DropDownNavBar from "./DropDownNavBar";
import { useRouter } from "next/dist/client/router";

function NavBar() {
  const { account } = useMetaMask();
  const router = useRouter();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      bg="linear-gradient(180deg, #3e415e 0%, rgba(27, 28, 39, 0) 100%)"
      backdropFilter="backdrop-filter: blur(50px)"
      padding="0.8rem 1.5rem"
    >
      <Box className="logo" width="10%">
        <Image src="/images/general/content.png" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="60%"
        boxSizing="border-box"
        justifyContent="space-around"
        padding="0 10%"
      >
        {navbar.map((value) => {
          return (
            <ListNavBar
              key={value.id}
              active={value.path === router.pathname}
              path={value.path}
            >
              {value.label}
            </ListNavBar>
          );
        })}
      </Box>
      <Box width="12%">
        {account ? (
          <Box display="flex" alignItems="center">
            <Image src="/images/general/shiba.png" borderRadius="50%" />
            <Text margin="0 1rem 0 0.5rem">
              {`${account.slice(0, 5)}...${account.slice(
                account.length - 5,
                account.length
              )}`}
            </Text>
            <DropDownNavBar />
          </Box>
        ) : (
          <ButtonConnect />
        )}
      </Box>
    </Box>
  );
}

export { NavBar };
