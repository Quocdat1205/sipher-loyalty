import { BigNumber, Contract, providers } from "ethers";
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
export class LootboxTrackerMintedService {
  private provider: providers.Provider;

  private contract: Contract;

  private fromBlockMinted: number;

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
        where: { type: "mint" },
      });
      if (trackedBlock) this.fromBlockMinted = trackedBlock.tracked;
      else {
        this.fromBlockMinted = 0;
        this.trackedBlockRepo.save({ type: "mint", tracked: 0 });
      }
    } catch (err) {
      LoggerService.error(err);
      this.fromBlockMinted = 0;
    }
  };

  @Interval("tracking lootbox minted", 15000)
  async TrackingMintedInterval() {
    this.fromBlockMinted = await this.trackingMinted(this.fromBlockMinted);
    const trackedBlock = await this.trackedBlockRepo.findOne({
      where: { type: "mint" },
    });
    trackedBlock.tracked = this.fromBlockMinted;
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

  /// /////////// MINT

  private trackingMintedBatch = async (
    _fromBlock: number,
    _currentBlock: number
  ) => {
    const filter = this.contract.filters.MintedBatch();
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
      const { minter, batchID, amount, salt } = event.args;
      const batchOrder = {
        to: minter.toLowerCase(),
        batchID: batchID.map((id: BigNumber) => Number(id)),
        amount: amount.map((num: BigNumber) => Number(num)),
        salt,
      };
      this.lootBoxService.updateLootboxFromTrackerMintedBatchOrder(batchOrder);
    }, Promise.resolve());

    return _currentBlock + 1;
  };

  private trackingMintedSingle = async (
    _fromBlock: number,
    _currentBlock: number
  ) => {
    const filter = this.contract.filters.Minted();
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
      const { minter, batchID, amount, salt } = event.args;
      const order = {
        to: minter.toLowerCase(),
        batchID: Number(batchID),
        amount: Number(amount),
        salt,
      };
      this.lootBoxService.updateLootboxFromTrackerMintedOrder(order);
    }, Promise.resolve());

    return _currentBlock + 1;
  };

  private trackingMinted = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (this.fromBlockMinted === undefined || _fromBlock >= _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(
      `Start tracking minted from block ${_fromBlock} to block ${_currentBlock}`
    );
    const blockMintedSingle = await this.trackingMintedBatch(
      _fromBlock,
      _currentBlock
    );
    const blockMintedBatch = await this.trackingMintedSingle(
      _fromBlock,
      _currentBlock
    );
    const _toBlock =
      blockMintedSingle > blockMintedBatch
        ? blockMintedBatch
        : blockMintedSingle;
    LoggerService.log(`End tracking minted at ${_toBlock}`);
    return _toBlock;
  };
}
