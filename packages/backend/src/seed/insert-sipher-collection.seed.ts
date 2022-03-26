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
          id: "0x09e0df4ae51111ca27d6b85708cfb3f1f7cae982".toLowerCase(),
          name: "NEKO COLLECTION",
          collectionType: CollectionType.ERC721,
          collectionSlug: "sipherianflash",
          chainId: 1,

          category: CollectionCategory.CHARACTER,
          isVerified: true,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
        {
          id: "0x3EdB954303D0A13ee347C6989189294B0422E7D6".toLowerCase(),
          name: "SIPHER SCULPTURE",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "siphersculpture",
          chainId: 80001,

          category: CollectionCategory.SCULPTURE,
          isVerified: false,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
        {
          id: "0x3e445d426c8fde12f5f0c223019ca9158f7da93b".toLowerCase(),
          name: "SIPHER SPACESHIP",
          collectionType: CollectionType.ERC1155,
          collectionSlug: "sipherspaceship",
          chainId: 80001,

          category: CollectionCategory.SPACESHIP,
          isVerified: false,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
        {
          id: "0x4d91fa57abfead5fbc8445e45b906b85bbd9744c".toLowerCase(),
          name: "SIPHER INU RINKEBY",
          collectionType: CollectionType.ERC721,
          collectionSlug: "sipherinu",
          chainId: 4,

          category: CollectionCategory.CHARACTER,
          isVerified: false,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
        },
        {
          id: "0x97c8480d593b93ae90f8613a5b2ac02e7a3dd0ed".toLowerCase(),
          name: "SIPHER NEKO RINKEBY",
          collectionType: CollectionType.ERC721,
          collectionSlug: "sipherneko",
          chainId: 4,

          category: CollectionCategory.CHARACTER,
          isVerified: false,
          siteUrl: "https://sipher.xyz",
          bannerImage:
            "https://lh3.googleusercontent.com/LrdoFh3E8rq43JucGYm9Xkhh0OLoERNCa5yJi98D1a6Tb0KlYGWmrmqhZF0JqsTezncOXCInL7iGnv-JV0YjIe9lSwrSknzaVW8orw=s2500",
          logoImage:
            "https://lh3.googleusercontent.com/05CzjTR4KwoX_qTY_U68CegfrCVTAYMmY3txcaauGpjJNZBac2-6hFMQtfcnMIx7g1B3BhBqWmta_mzNyunLLtDygyrW0U6n4nhc=s120",
        },
      ])
      .execute();
  }
}
