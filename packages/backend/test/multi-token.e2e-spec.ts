import request from "supertest";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { MultiTokenModule } from "@modules/multi-token/multi-token.module";

describe("Collection", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MultiTokenModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: true,
        disableErrorMessages: false,
      })
    );
    await app.init();
  });

  describe("/GET multi-token balance", () => {
    it("should return 200", async () => {
      const res = await request(app.getHttpServer()).get(
        "/erc1155/balance/0xB6B61613268921913A5c01dF94D21D4de34e84cE/1"
      );
      expect(res.statusCode).toEqual(200);
    });

    it("should return 400 when address is invalid", async () => {
      const res = await request(app.getHttpServer()).get(
        "/erc1155/balance/0xB6B61613268921913A5c01dF94D21D4de3/1"
      );
      expect(res.statusCode).toEqual(400);
    });

    it("should return 400 when tokenId is invalid", async () => {
      const res = await request(app.getHttpServer()).get(
        "/erc1155/balance/0xB6B61613268921913A5c01dF94D21D4de34e84cE/sods"
      );
      expect(res.statusCode).toEqual(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
