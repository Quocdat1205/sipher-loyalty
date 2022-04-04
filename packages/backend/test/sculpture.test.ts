import { Repository } from "typeorm";
import { SculptureTransaction } from "@entity";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { RedeemTxDto } from "@modules/sculpture/sculpture.dto";
import { SculptureService } from "@modules/sculpture/sculpture.service";

describe("Sculpture unit test", () => {
  let sculptureService: SculptureService;
  let sculptureTxRepo: Repository<SculptureTransaction>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: getRepositoryToken(SculptureTransaction),
          useClass: Repository,
        },
        SculptureService,
      ],
    }).compile();
    sculptureService = moduleRef.get<SculptureService>(SculptureService);
    sculptureTxRepo = moduleRef.get<Repository<SculptureTransaction>>(
      getRepositoryToken(SculptureTransaction)
    );
  });

  describe("getAddressTx()", () => {
    const tx = new SculptureTransaction();
    tx.id = "1";
    it("should return tx", async () => {
      jest.spyOn(sculptureTxRepo, "find").mockImplementation(async () => [tx]);
      expect(await sculptureService.getAddressTx("0x")).toEqual([tx]);
    });

    it("should return empty array", async () => {
      jest.spyOn(sculptureTxRepo, "find").mockImplementation(async () => []);
      expect(await sculptureService.getAddressTx("0x")).toEqual([]);
    });
  });

  describe("saveRedeemTransaction()", () => {
    const txDto = new RedeemTxDto();
    const tx = new SculptureTransaction();
    it("should do nothing since tx is saved already", async () => {
      const sculptureFindOneMock = jest
        .spyOn(sculptureTxRepo, "findOne")
        .mockImplementation(async () => tx);
      await sculptureService.saveRedeemTransaction(txDto);
      expect(sculptureFindOneMock).toHaveBeenCalled();
    });
    it("should save transaction", async () => {
      const sculptureFindOneMock = jest
        .spyOn(sculptureTxRepo, "findOne")
        .mockImplementation(async () => undefined);
      const sculptureSaveMock = jest
        .spyOn(sculptureTxRepo, "save")
        .mockImplementation(async () => tx);
      await sculptureService.saveRedeemTransaction(txDto);
      expect(sculptureFindOneMock).toHaveBeenCalled();
      expect(sculptureSaveMock).toHaveBeenCalled();
    });
  });
});
