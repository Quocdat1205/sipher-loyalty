import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import CardSelection from "./CardSelection";
import { selecttionDropdown } from "@utils";
import Link from "next/link";

const ListSelection = () => {
  return (
    <Box>
      {selecttionDropdown.map((value) => {
        return (
          <Link href={`${value.path}`} key={value.id}>
            <a>
              <CardSelection active={value.id === 1}>
                <Box>
                  <Image src={value.image} marginRight="0.5rem" w="1rem" />
                </Box>
                <Text color="text.primary" textTransform="capitalize">
                  {value.label}
                </Text>
              </CardSelection>
            </a>
          </Link>
        );
      })}
    </Box>
  );
};

export default ListSelection;
