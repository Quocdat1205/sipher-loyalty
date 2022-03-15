import { BigNumber, Contract, providers } from "ethers";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant from "@setting/constant";

import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { ZERO_ADDRESS } from "@utils/constants";
import { signer } from "@utils/signer";

import { LoggerService } from "../../logger/logger.service";

@Injectable()
export class LootboxTrackerService {
  private provider: providers.Provider;

  private contract: Contract;

  private contractWithSigner;

  private fromBlock: number;

  constructor(private lootBoxService: LootBoxService) {
    this.provider = getProvider(constant.CHAIN_ID);
    this.contract = getContract(
      constant.config.erc1155Spaceship.verifyingContract,
      erc1155Abi,
      this.provider
    );
    this.contractWithSigner = this.contract.connect(signer);
    this.fromBlock = 0;
  }

  @Interval("tracking lootbox transfer", 15000)
  async triggerMethodBasedOnNamedInterval() {
    this.fromBlock = await this.trackingMinted(this.fromBlock);
  }

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
        this.lootBoxService.updateLootboxFromTrackerBatchOrder(batchOrder)
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
      promises.push(this.lootBoxService.updateLootboxFromTrackerOrder(order));
    });
    await Promise.all(promises);
    return _currentBlock + 1;
  };

  private trackingMinted = async (_fromBlock: number) => {
    const _currentBlock = await this.currentBlock();
    if (_fromBlock === _currentBlock) {
      return _fromBlock; // retry
    }
    LoggerService.log(`Start tracking from ${_fromBlock} to ${_currentBlock}`);
    const promises = [];
    promises.push(this.trackingMintedBatch(_fromBlock, _currentBlock));
    promises.push(this.trackingMintedSingle(_fromBlock, _currentBlock));
    const result = await Promise.all(promises);
    LoggerService.log(`End tracking ${_currentBlock + 1}`);
    return result.sort((a, b) => a - b)[0];
  };
}
