import React from "react";
import { Box } from "@chakra-ui/react";
import Banner from "@components/shared/Banner";
import Content from "./Content";

const ContentReward = () => {
  return (
    <Box>
      <Banner
        title="rewards"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      />
      <Content />
    </Box>
  );
};

export default ContentReward;
