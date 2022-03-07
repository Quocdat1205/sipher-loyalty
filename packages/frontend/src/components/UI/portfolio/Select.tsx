import React from "react";
import { Select, Box } from "@chakra-ui/react";
import { selectType } from "@type";

const SelectPortfolio = (select: selectType) => {
  return (
    <Box
      width="15%"
      marginLeft="1rem"
      bg="#45465E"
      border="none"
      borderRadius="4px"
    >
      <Select placeholder={select.placeholder}>
        {select.option.map((value, index) => {
          return (
            <option value={value.value} key={index}>
              {value.label}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectPortfolio;
