import React from "react";
import { IndexPage } from "@components/shared/Heading";
import { Layout } from "@components/shared/Layout";
import ContentReward from "@components/UI/reward";

const reward = () => {
  return (
    <Layout>
      <IndexPage title="Quest loyalty" />
      <ContentReward />
    </Layout>
  );
};

export default reward;
