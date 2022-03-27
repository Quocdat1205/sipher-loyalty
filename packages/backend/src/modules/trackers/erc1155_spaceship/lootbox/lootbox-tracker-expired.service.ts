import { LessThan, Repository } from "typeorm";
import { MintStatus, PendingMint } from "@entity";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "@modules/logger/logger.service";
import { getNow } from "@utils/utils";

@Injectable()
export class LootboxTrackerExpiredService {
  constructor(
    @InjectRepository(PendingMint)
    private pendingMintRepo: Repository<PendingMint>
  ) {}

  @Interval("tracking lootbox expired", 15000)
  async TrackingExpiredInterval() {
    await this.updateExpiredPending();
  }

  private updateExpiredPending = async () => {
    const _now = getNow();
    LoggerService.log(`Start scan expired pending minting at : ${_now}`);
    const pendings = await this.pendingMintRepo.find({
      where: [{ deadline: LessThan(_now), status: MintStatus.Minting }],
    });
    const promises = [];
    for (let i = 0; i < pendings.length; i++) {
      pendings[i].status = MintStatus.Expired;
      promises.push(this.pendingMintRepo.save(pendings[i]));
    }
    const result = Promise.all(promises);
    LoggerService.log(
      `End scan expired pending minting with result : ${JSON.stringify(result)}`
    );
  };
}
