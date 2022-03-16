import { ShopifyCode } from "../entity/shopify-code.entity";
import { define } from "typeorm-seeding";

define(ShopifyCode, () => {
  const shopifyCode = new ShopifyCode();
  shopifyCode.code = `Yeet${Math.round(Math.random() * 10000)}`;
  return shopifyCode;
});
