import { Factory, Seeder } from "typeorm-seeding";

import { ShopifyCode } from "../entity/shopify-code.entity";

export default class CreateShopifyCode implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(ShopifyCode)().createMany(100);
  }
}
