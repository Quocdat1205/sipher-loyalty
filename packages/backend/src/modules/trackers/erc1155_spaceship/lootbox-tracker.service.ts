import { BigNumber, Contract, providers } from "ethers";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { ZERO_ADDRESS } from "@utils/constants";
import { signer } from "@utils/signer";
import { TrackedBlock } from "src/entity/tracking.entity";

import { LoggerService } from "../../logger/logger.service";

@Injectable()
export class LootboxTrackerService {
  private provider: providers.Provider;

  private contract: Contract;

  private contractWithSigner;

  private fromBlockMinted: number;

  private fromBlockBurned: number;

  private fromBlockCanceled: number;

  constructor(
    private lootBoxService: LootBoxService,
    @InjectRepository(TrackedBlock)
    private trackedBlockRepo: Repository<TrackedBlock>
  ) {
    this.getStartMintedBlock();
    this.getStartBurnedBlock();
    this.getStartCanceledBlock();

    this.provider = getProvider(
      constant.isProduction ? Chain.Polygon : Chain.Mumbai
    );
    this.contract = getContract(
      constant.config.erc1155Spaceship.verifyingContract,
      erc1155Abi,
      this.provider
    );
    this.contractWithSigner = this.contract.connect(signer);
  }

  @Interval("tracking lootbox minted", 15000)
  async TrackingMintedInterval() {
    this.fromBlockMinted = await this.trackingMinted(this.fromBlockMinted);
    const trackedBlock = await this.trackedBlockRepo.findOne({
      where: { type: "mint" },
    });
    trackedBlock.tracked = this.fromBlockMinted;
    this.trackedBlockRepo.save(trackedBlock);
  }

  @Interval("tracking lootbox burned", 15000)
  async TrackingBurnedInterval() {
    this.fromBlockBurned = await this.trackingBurned(this.fromBlockBurned);
    const trackedBlock = await this.trackedBlockRepo.findOne({
      where: { type: "burn" },
    });
    trackedBlock.tracked = this.fromBlockBurned;
    this.trackedBlockRepo.save(trackedBlock);
  }

  @Interval("tracking lootbox canceled", 15000)
  async TrackingCanceledInterval() {
    // this.fromBlockBurned = await this.trackingCancel(this.fromBlockCanceled);
    const trackedBlock = await this.trackedBlockRepo.findOne({
      where: { type: "cancel" },
    });
    trackedBlock.tracked = this.fromBlockCanceled;
    this.trackedBlockRepo.save(trackedBlock);
  }

  private getStartMintedBlock = async () => {
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

  private getStartBurnedBlock = async () => {
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

  private trackingTranserBatch = async (_fromBlock: number) => {
    const tokenCheckers = [];
    const _currentBlock = await this.currentBlock();
    if (_fromBlock === _currentBlock) {
      return _fromBlock; // retry
    }
    const filter = this.contract.filters.TransferBatch();
    const pastEvents = await this.contract
      .queryFilter(filter, _fromBlock, _currentBlock)
      .catch((err) => {
        LoggerService.error(err, "Failed to get events");
      });
    if (!pastEvents) {
      return _fromBlock; // retry
    }
    pastEvents.forEach((event) => {
      const { from, to, ids } = event.args;
      if (from !== ZERO_ADDRESS) {
        const index = tokenCheckers.findIndex(
          (token) => token.publicAddress === from
        );
        if (index === -1) tokenCheckers.push({ publicAddress: from, ids });
        else tokenCheckers[index].ids.concat(ids);
      }
      if (to !== ZERO_ADDRESS) {
        const index = tokenCheckers.findIndex(
          (token) => token.publicAddress === to
        );
        if (index === -1) tokenCheckers.push({ publicAddress: to, ids });
        else tokenCheckers[index].ids.concat(ids);
      }
    });
    return _currentBlock;
  };

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
    const promises = [];
    pastEvents.forEach((event) => {
      const { minter, batchID, amount, salt } = event.args;
      const batchOrder = {
        to: minter,
        batchID: batchID.map((id: BigNumber) => Number(id)),
        amount: amount.map((num: BigNumber) => Number(num)),
        salt,
      };
      promises.push(
        this.lootBoxService.updateLootboxFromTrackerMintedBatchOrder(batchOrder)
      );
    });
    await Promise.all(promises);
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
    const promises = [];
    pastEvents.forEach((event) => {
      const { minter, batchID, amount, salt } = event.args;
      const order = {
        to: minter,
        batchID: Number(batchID),
        amount: Number(amount),
        salt,
      };
      promises.push(
        this.lootBoxService.updateLootboxFromTrackerMintedOrder(order)
      );
    });
    await Promise.all(promises);
    return _currentBlock + 1;
  };

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
    const promises = [];
    pastEvents.forEach((event) => {
      const { burner, batchID, amount, salt } = event.args;
      const batchOrder = {
        to: burner,
        batchID: batchID.map((id: BigNumber) => Number(id)),
        amount: amount.map((num: BigNumber) => Number(num)),
        salt,
      };

      promises.push(
        this.lootBoxService.updateLootboxFromTrackerBurnedBatchOrder(batchOrder)
      );
    });
    await Promise.all(promises);
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
    const promises = [];
    pastEvents.forEach((event) => {
      const { burner, batchID, amount, salt } = event.args;
      const order = {
        to: burner,
        batchID: Number(batchID),
        amount: Number(amount),
        salt,
      };
      promises.push(
        this.lootBoxService.updateLootboxFromTrackerBurnedOrder(order)
      );
    });
    await Promise.all(promises);
    return _currentBlock + 1;
  };

  private trackingMinted = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (this.fromBlockMinted === undefined || _fromBlock >= _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(
      `Start tracking minted from ${_fromBlock} to ${_currentBlock}`
    );
    const promises = [];
    promises.push(this.trackingMintedBatch(_fromBlock, _currentBlock));
    promises.push(this.trackingMintedSingle(_fromBlock, _currentBlock));
    const result = await Promise.all(promises);
    const _toBlock = result.sort((a, b) => a - b)[0];
    LoggerService.log(`End tracking minted at ${_toBlock}`);
    return _toBlock;
  };

  private trackingBurned = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (this.fromBlockBurned === undefined || _fromBlock >= _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(
      `Start tracking burned from ${_fromBlock} to ${_currentBlock}`
    );
    const promises = [];
    promises.push(this.trackingBurnedBatch(_fromBlock, _currentBlock));
    promises.push(this.trackingBurnedSingle(_fromBlock, _currentBlock));
    const result = await Promise.all(promises);
    const _toBlock = result.sort((a, b) => a - b)[0];
    LoggerService.log(`End tracking burned at ${_toBlock}`);
    return _toBlock;
  };

  private trackingCancel = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (this.fromBlockBurned === undefined || _fromBlock >= _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(
      `Start tracking burned from ${_fromBlock} to ${_currentBlock}`
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
    const promises = [];
    pastEvents.forEach((event) => {
      const { signature } = event.args;
      promises.push(
        this.lootBoxService.updateLootboxFromTrackerCancelOrder(signature)
      );
    });
    await Promise.all(promises);
    return _currentBlock + 1;
  };
}
