import React from "react";
import { Layout } from "@components/shared/Layout";
import { IndexPage } from "@components/shared/Heading";
import ContentAirDrop from "@components/UI/airdrop";

const airdrop = () => {
  return (
    <Layout>
      <IndexPage title="Airdrop loyalty sipher" />
      <ContentAirDrop />
    </Layout>
  );
};

export default airdrop;
