import React from "react";
import { IndexPage } from "@components/shared/Heading";
import { Layout } from "@components/shared/Layout";
import ContentQuest from "@components/UI/quest";

const Portfolio = () => {
  return (
    <Layout>
      <IndexPage title="Quest loyalty" />
      <ContentQuest />
    </Layout>
  );
};

export default Portfolio;
