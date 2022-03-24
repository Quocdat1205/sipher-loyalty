import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import {
  CollectionCategory,
  CollectionType,
  SipherCollection,
} from "../entity/sipher-collection.entity";

export default class InsertSipherCollection implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(SipherCollection)
      .values([
        {
          name: "NEKO COLLECTION",
          collectionType: CollectionType.ERC721,
          collectionSlug: "sipherianflash",
          chainId: 1,
          contractAddress:
            "0x09e0df4ae51111ca27d6b85708cfb3f1f7cae982".toLowerCase(),
          category: CollectionCategory.CHARACTER,
        },
        {
          name: "SIPHER SCULPTURE",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "siphersculpture",
          chainId: 80001,
          contractAddress:
            "0x3EdB954303D0A13ee347C6989189294B0422E7D6".toLowerCase(),
          category: CollectionCategory.SCULPTURE,
        },
        {
          name: "SIPHER SPACESHIP",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "sipherspaceship",
          chainId: 80001,
          contractAddress:
            "0x890e002a6bb11d0094d80f4c301caf645d168333".toLowerCase(),
          category: CollectionCategory.SPACESHIP,
        },
      ])
      .execute();
  }
}
