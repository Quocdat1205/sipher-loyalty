import { BigNumber, Contract, providers } from "ethers";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { sculptureAbi } from "@setting/blockchain/abis/sculpture";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { SculptureService } from "@modules/sculpture/sculpture.service";
import { TrackedBlock } from "src/entity/tracking.entity";

@Injectable()
export class ScupltureTrackerService {
  private sculptureContract: Contract;

  private provider: providers.Provider;

  constructor(
    private scupltureService: SculptureService,
    @InjectRepository(TrackedBlock)
    private trackBlockRepo: Repository<TrackedBlock>
  ) {
    this.provider = getProvider(
      constant.isProduction ? Chain.Polygon : Chain.Mumbai
    );
    this.sculptureContract = getContract(
      constant.blockchain.contracts.erc1155Sculpture[constant.CHAIN_ID].address,
      sculptureAbi,
      this.provider
    );
  }

  @Interval("scuplture-tracker", 15000)
  async runOnIntervalTracker() {
    const fromBlock = await this.getFromBlock();
    const toBlock = await this.getToBlock(fromBlock);
    await this.trackRedeemedRecord(fromBlock, toBlock);
    await this.updateTrackerBlock(toBlock);
  }

  private async updateTrackerBlock(newBlock: number) {
    let currentTrackedBlock = await this.trackBlockRepo.findOne({
      where: {
        type: "tracker-sculpture",
      },
    });
    if (!currentTrackedBlock) {
      currentTrackedBlock = new TrackedBlock();
      currentTrackedBlock.type = "tracker-sculpture";
    }
    currentTrackedBlock.tracked = newBlock;
    await this.trackBlockRepo.save(currentTrackedBlock);
  }

  private async getFromBlock(): Promise<number> {
    const currentTrackedBlock = await this.trackBlockRepo.findOne({
      where: {
        type: "tracker-sculpture",
      },
    });
    // 25564814 is this contract deployment block
    return currentTrackedBlock ? currentTrackedBlock.tracked : 25564814;
  }

  private async getToBlock(currentFromBlock: number): Promise<number> {
    const chainLatestBlock = await this.provider.getBlockNumber();
    const toBlock = currentFromBlock + 10000;
    if (toBlock <= chainLatestBlock) {
      return toBlock;
    }
    return chainLatestBlock;
  }

  async trackRedeemedRecord(fromBlock: number, toBlock: number) {
    const eventType = this.sculptureContract.filters.RedeemRecord();
    LoggerService.debug(`Tracking sculptures from ${fromBlock} to ${toBlock}`);
    const events = await this.sculptureContract.queryFilter(
      eventType,
      fromBlock,
      toBlock
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const event of events) {
      const ownerAddress = event.args[0];
      const tokenId = (event.args[1] as BigNumber).toString();
      const amount = (event.args[2] as BigNumber).toNumber();
      await this.scupltureService.saveRedeemTransaction({
        address: ownerAddress,
        tokenId,
        amount,
        txHash: event.transactionHash,
      });
    }
  }
}
