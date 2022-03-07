import React from "react";
import Content from "./Content";
import { Box } from "@chakra-ui/react";
import Banner from "@components/shared/Banner";

const ContentQuest = () => {
  return (
    <Box>
      <Banner
        title="Quests"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      />
      <Content />
    </Box>
  );
};

export default ContentQuest;
