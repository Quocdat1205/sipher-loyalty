import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

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
          isVerified: true,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
        {
          name: "SIPHER SCULPTURE",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "siphersculpture",
          chainId: 80001,
          contractAddress:
            "0x3EdB954303D0A13ee347C6989189294B0422E7D6".toLowerCase(),
          category: CollectionCategory.SCULPTURE,
          isVerified: false,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
        {
          name: "SIPHER SPACESHIP",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "sipherspaceship",
          chainId: 80001,
          contractAddress:
            "0x890e002a6bb11d0094d80f4c301caf645d168333".toLowerCase(),
          category: CollectionCategory.SPACESHIP,
          isVerified: false,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
      ])
      .execute();
  }
}
