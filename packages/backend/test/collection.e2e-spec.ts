import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { CollectionModule } from "@modules/collection/collection.module";

describe("Collection", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CollectionModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe("/GET collection stats", () => {
    it("should return 200", () =>
      request(app.getHttpServer())
        .get("/collection/sipherianflash/stats")
        .expect(200));

    it("should return 404", async () => {
      const response = await request(app.getHttpServer()).get(
        "/collection/h2ds345asl/stats"
      );
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("Collection not found");
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
