import React from "react";
import Banner from "@components/shared/Banner";
import { Box } from "@chakra-ui/react";
import Content from "./Content";

const ContentAirDrop = () => {
  return (
    <Box>
      <Banner
        title="Airdrops"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      />
      <Content />
    </Box>
  );
};

export default ContentAirDrop;
