import { ShopifyCode, User } from "@entity";
import { MultiTokenModule } from "@modules/multi-token/multi-token.module";
import { SculptureService } from "@modules/sculpture/sculpture.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BigNumber } from "ethers";
import { Repository } from "typeorm";

describe("Sculpture unit test", () => {
  let sculptureService: SculptureService;
  let shopifyCodeRepo: Repository<ShopifyCode>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MultiTokenModule],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(ShopifyCode),
          useClass: Repository,
        },
        SculptureService,
      ],
    }).compile();
    sculptureService = moduleRef.get<SculptureService>(SculptureService);
    shopifyCodeRepo = moduleRef.get<Repository<ShopifyCode>>(
      getRepositoryToken(ShopifyCode)
    );
  });
});
