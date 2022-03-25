import constant from "@setting/constant";
import { Api } from "./marketplaceSdk";

const marketplaceClient = new Api({
  format: "json",
  baseURL: "https://dev-api-marketplace.sipher.gg",
});

export default marketplaceClient;
