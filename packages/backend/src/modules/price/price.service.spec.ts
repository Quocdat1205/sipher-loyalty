import { Test, TestingModule } from "@nestjs/testing";

import { PriceService } from "./price.service";

describe("PriceService", () => {
  let service: PriceService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
    }).compile();

    service = module.get(PriceService);
  });

  describe("getSipherPrice", () => {
    it("should returns a number", async () => {
      const result = 1;
      jest.spyOn(service, "getSipherPrice").mockResolvedValue(result);
      expect(await service.getSipherPrice()).toBe(result);
    });
  });

  describe("getEtherPrice", () => {
    it("should returns a number", async () => {
      const result = 4000;
      jest.spyOn(service, "getEtherPrice").mockResolvedValue(result);
      expect(await service.getEtherPrice()).toBe(result);
    });
  });

  describe("getPriceChange", () => {
    it("should returns a number", async () => {
      const result = 0.9;
      jest.spyOn(service, "getPriceChange").mockResolvedValue(result);
      expect(await service.getPriceChange()).toBe(result);
    });
  });
});
