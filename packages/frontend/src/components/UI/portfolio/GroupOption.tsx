import React from "react";
import { Box } from "@chakra-ui/react";
import SelectPortfolio from "./Select";
import { categories, rank, rarity } from "@utils";

const GroupOption = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      margin="1.2rem"
    >
      <SelectPortfolio placeholder={"Categories"} option={categories} />
      <SelectPortfolio placeholder={"Rank"} option={rank} />
      <SelectPortfolio placeholder={"Rarity"} option={rarity} />
    </Box>
  );
};

export default GroupOption;
