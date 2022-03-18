import { define } from "typeorm-seeding";

import { ShopifyCode } from "../entity/shopify-code.entity";

define(ShopifyCode, () => {
  const shopifyCode = new ShopifyCode();
  shopifyCode.code = `Yeet${Math.round(Math.random() * 10000)}`;
  return shopifyCode;
});
