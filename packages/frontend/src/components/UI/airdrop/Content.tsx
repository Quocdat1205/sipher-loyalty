import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import All from "./All";
import Nfts from "./Nfts";
import Tokens from "./Tokens";
import Sculptures from "./Sculptures";

const data = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "NFTs",
  },
  {
    id: 3,
    label: "Tokens",
  },
  {
    id: 4,
    label: "Sculptures",
  },
];

const Content = () => {
  const [active, setActive] = useState("all");

  const handleSetActive = (state: string) => {
    setActive(state);
  };

  return (
    <Box w="85%" margin="auto">
      <Box
        className="nav-tab"
        display="flex"
        alignItems="center"
        marginTop="2rem"
        borderBottom="1px solid #45465E"
      >
        {data.map((value) => {
          return (
            <Box
              key={value.id}
              marginRight="1.5rem"
              paddingBottom="0.5rem"
              borderBottom={
                value.label.toLowerCase() === active.toLowerCase()
                  ? `2px solid yellow`
                  : "none"
              }
              onClick={() => handleSetActive(value.label)}
              cursor="pointer"
              boxSizing="border-box"
            >
              <Text
                color={
                  value.label.toLowerCase() === active.toLowerCase()
                    ? "#FFFFFF"
                    : "text.gray"
                }
                fontWeight="bold"
              >
                {value.label}
              </Text>
            </Box>
          );
        })}
      </Box>
      <Box marginTop="1.5rem">
        {active.toLowerCase() === "all" ? (
          <All />
        ) : active.toLowerCase() === "nfts" ? (
          <Nfts />
        ) : active.toLowerCase() === "tokens" ? (
          <Tokens />
        ) : (
          <Sculptures />
        )}
      </Box>
    </Box>
  );
};

export default Content;
