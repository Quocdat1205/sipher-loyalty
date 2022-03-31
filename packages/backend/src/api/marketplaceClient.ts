import { Api } from "./marketplaceSdk";

const marketplaceClient = new Api({
  format: "json",
  baseURL: "https://dev-api-marketplace.sipher.gg/api/",
});

export default marketplaceClient;
