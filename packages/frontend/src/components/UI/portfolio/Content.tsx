import React, { useState } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import ListNft from "@components/shared/ListNft";
import Tokens from "@components/shared/Tokens";
import Sculptures from "@components/shared/Sculptures";
import GroupOption from "./GroupOption";

const data = [
  {
    id: 1,
    label: "Nfts",
  },
  {
    id: 2,
    label: "Tokens",
  },
  {
    id: 3,
    label: "Sculptures",
  },
];

const Content = () => {
  const [tab_active, setTabActive] = useState("nfts");

  const handleSetActive = (active: string) => {
    setTabActive(active);
  };

  return (
    <Box>
      <Box className="content-portfolio" display="flex">
        {data.map((value) => {
          return (
            <Box
              key={value.id}
              display="flex"
              margin="1rem 0"
              marginRight="2rem"
              paddingBottom="0.5rem"
              cursor="pointer"
              borderBottom={
                tab_active.toLowerCase() === value.label.toLowerCase()
                  ? "2px solid #F4B433"
                  : ""
              }
              onClick={() => handleSetActive(value.label)}
            >
              <Text>{value.label}</Text>
            </Box>
          );
        })}
      </Box>
      {tab_active.toLowerCase() === "nfts" ? (
        <>
          <GroupOption />
          <ListNft />
        </>
      ) : tab_active.toLowerCase() === "tokens" ? (
        <Tokens />
      ) : (
        <Sculptures />
      )}
    </Box>
  );
};

export default Content;
