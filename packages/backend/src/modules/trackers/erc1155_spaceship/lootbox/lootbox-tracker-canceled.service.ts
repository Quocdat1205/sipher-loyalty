import { Contract, providers } from "ethers";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { TrackedBlock } from "src/entity/tracking.entity";

@Injectable()
export class LootboxTrackerCancelService {
  private provider: providers.Provider;

  private contract: Contract;

  private fromBlockCanceled: number;

  private chain = constant.isProduction ? Chain.Polygon : Chain.Mumbai;

  constructor(
    private lootBoxService: LootBoxService,
    @InjectRepository(TrackedBlock)
    private trackedBlockRepo: Repository<TrackedBlock>
  ) {
    this.getStartCanceledBlock();

    this.provider = getProvider(this.chain);
    this.contract = getContract(
      constant.config.erc1155LootBox.verifyingContract,
      erc1155Abi,
      this.provider
    );
  }

  @Interval("tracking lootbox canceled", 15000)
  async TrackingCanceledInterval() {
    this.fromBlockCanceled = await this.trackingCancel(this.fromBlockCanceled);
    const trackedBlock = await this.trackedBlockRepo.findOne({
      where: { type: "cancel" },
    });
    trackedBlock.tracked = this.fromBlockCanceled;
    this.trackedBlockRepo.save(trackedBlock);
  }

  private getStartCanceledBlock = async () => {
    try {
      const trackedBlock = await this.trackedBlockRepo.findOne({
        where: { type: "cancel" },
      });
      if (trackedBlock) this.fromBlockCanceled = trackedBlock.tracked;
      else {
        this.fromBlockCanceled = 0;
        this.trackedBlockRepo.save({ type: "cancel", tracked: 0 });
      }
    } catch (err) {
      LoggerService.error(err);
      this.fromBlockCanceled = 0;
    }
  };

  private currentBlock = async () => {
    try {
      return this.provider.getBlockNumber();
    } catch (err) {
      LoggerService.error(err);
      return 0;
    }
  };

  /// /////////// CANCEL

  private trackingCancel = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (this.fromBlockCanceled === undefined || _fromBlock >= _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(
      `Start tracking canceled from block ${_fromBlock} to block ${_currentBlock}`
    );
    const filter = this.contract.filters.CancelOrder();
    const pastEvents = await this.contract
      .queryFilter(filter, _fromBlock, _currentBlock)
      .catch((err) => {
        LoggerService.error(err, "Failed to get events");
      });
    if (!pastEvents) {
      return _fromBlock; // retry
    }
    await pastEvents.reduce(async (promise, event) => {
      await promise;
      const { signature } = event.args;
      await this.lootBoxService.updateLootboxFromTrackerCancelOrder(signature);
    }, Promise.resolve());
    LoggerService.log(`End tracking minted at ${_currentBlock + 1}`);
    return _currentBlock + 1;
  };
}
