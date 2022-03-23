import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import {
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
          contractAddress: "0x09E0dF4aE51111CA27d6B85708CFB3f1F7cAE982",
        },
        {
          name: "SIPHER SCULPTURE",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "siphersculpture",
          chainId: 80001,
          contractAddress: "0xF40FDc85Cbe6013b44D230a036770704FB92890c",
        },
      ])
      .execute();
  }
}
