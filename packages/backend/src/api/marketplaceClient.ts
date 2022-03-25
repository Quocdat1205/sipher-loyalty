import constant from "@setting/constant";
import { Api } from "./marketplaceSdk";

const marketplaceClient = new Api({
  format: "json",
  baseURL: constant.MARKETPLACE_SDK_URL,
});

export default marketplaceClient;
