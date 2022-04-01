import constant from "@setting/constant";

import { Api } from "./marketplaceSdk";

const marketplaceClient = new Api({
  format: "json",
  // baseURL: "https://dev-api-marketplace.sipher.gg",
  baseURL: constant.isProduction
    ? "https://api-marketplace.sipher.xyz"
    : "marketplace-backend-api.marketplace:3001",
});

export default marketplaceClient;
