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

  @Interval("tracking lootbox expired", 10000)
  async TrackingExpiredInterval() {
    await this.updateExpiredPending();
  }

  private updateExpiredPending = async () => {
    const pendings = await this.pendingMintRepo.find({
      where: [{ deadline: LessThan(getNow()), status: MintStatus.Pending }],
    });
    const promises = [];
    for (let i = 0; i < pendings.length; i++) {
      pendings[i].status = MintStatus.Expired;
      promises.push(this.pendingMintRepo.save(pendings[i]));
    }
    const result = Promise.all(promises);
    LoggerService.log(`pending updated : ${JSON.stringify(result)}`);
  };
}
