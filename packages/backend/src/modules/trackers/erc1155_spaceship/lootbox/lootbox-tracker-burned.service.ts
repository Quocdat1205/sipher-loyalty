import { BigNumber, Contract, providers } from "ethers";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { TrackedBlock } from "src/entity/tracking.entity";

import { LoggerService } from "../../../logger/logger.service";

@Injectable()
export class LootboxTrackerBurnedService {
  private provider: providers.Provider;

  private contract: Contract;

  private fromBlockBurned: number;

  private chain = constant.isProduction ? Chain.Polygon : Chain.Mumbai;

  constructor(
    private lootBoxService: LootBoxService,
    @InjectRepository(TrackedBlock)
    private trackedBlockRepo: Repository<TrackedBlock>
  ) {
    this.start();
  }

  private start = async () => {
    this.provider = await getProvider(this.chain);
    this.contract = getContract(
      constant.config.erc1155LootBox.verifyingContract,
      erc1155Abi,
      this.provider
    );
    try {
      const trackedBlock = await this.trackedBlockRepo.findOne({
        where: { type: "burn" },
      });
      if (trackedBlock) this.fromBlockBurned = trackedBlock.tracked;
      else {
        this.fromBlockBurned = 0;
        this.trackedBlockRepo.save({ type: "burn", tracked: 0 });
      }
    } catch (err) {
      LoggerService.error(err);
      this.fromBlockBurned = 0;
    }
  };

  @Interval("tracking lootbox burned", 15000)
  async TrackingBurnedInterval() {
    this.fromBlockBurned = await this.trackingBurned(this.fromBlockBurned);
    const trackedBlock = await this.trackedBlockRepo.findOne({
      where: { type: "burn" },
    });
    trackedBlock.tracked = this.fromBlockBurned;
    this.trackedBlockRepo.save(trackedBlock);
  }

  private currentBlock = async () => {
    try {
      return this.provider.getBlockNumber();
    } catch (err) {
      LoggerService.error(err);
      return 0;
    }
  };
  /// /////////// BURN

  private trackingBurnedBatch = async (
    _fromBlock: number,
    _currentBlock: number
  ) => {
    const filter = this.contract.filters.BurnedBatch();
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
      const { burner, batchID, amount, salt } = event.args;
      const batchOrder = {
        to: burner.toLowerCase(),
        batchID: batchID.map((id: BigNumber) => Number(id)),
        amount: amount.map((num: BigNumber) => Number(num)),
        salt,
      };
      this.lootBoxService.updateLootboxFromTrackerBurnedBatchOrder(batchOrder);
    }, Promise.resolve());

    return _currentBlock + 1;
  };

  private trackingBurnedSingle = async (
    _fromBlock: number,
    _currentBlock: number
  ) => {
    const filter = this.contract.filters.Burned();
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
      const { burner, batchID, amount, salt } = event.args;
      const order = {
        to: burner.toLowerCase(),
        batchID: Number(batchID),
        amount: Number(amount),
        salt,
      };
      await this.lootBoxService.updateLootboxFromTrackerBurnedOrder(order);
    }, Promise.resolve());

    return _currentBlock + 1;
  };

  private trackingBurned = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (this.fromBlockBurned === undefined || _fromBlock >= _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(
      `Start tracking burned from block ${_fromBlock} to block ${_currentBlock}`
    );
    const blockBurnedBatch = await this.trackingBurnedBatch(
      _fromBlock,
      _currentBlock
    );
    const blockBurnedSinggle = await this.trackingBurnedSingle(
      _fromBlock,
      _currentBlock
    );
    const _toBlock =
      blockBurnedBatch > blockBurnedSinggle
        ? blockBurnedSinggle
        : blockBurnedBatch;
    LoggerService.log(`End tracking burned at ${_toBlock}`);
    return _toBlock;
  };
}
