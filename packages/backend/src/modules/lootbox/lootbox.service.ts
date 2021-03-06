import { MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import {
  BurnType,
  CancelType,
  ERC1155Lootbox,
  Lootbox,
  MintStatus,
  PendingMint,
} from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";

import { UserData } from "@modules/auth/auth.types";
import { BurnService } from "@modules/burn/burn.service";
import { CacheService } from "@modules/cache/cache.service";
import { CancelService } from "@modules/cancel/cancel.service";
import { MintService } from "@modules/mint/mint.service";
import { BatchOrder, Order } from "@utils/type";
import { getNow, insertDetailStringToImage } from "@utils/utils";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

import { LoggerService } from "../logger/logger.service";

import {
  DistributeLootbox,
  MintBatchLootboxInputDto,
  MintLootboxInputDto,
} from "./lootbox.type";

@Injectable()
export class LootBoxService {
  constructor(
    @InjectRepository(Lootbox) private lootboxRepo: Repository<Lootbox>,
    @InjectRepository(ClaimableLootbox)
    private claimableLootboxRepo: Repository<ClaimableLootbox>,
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>,
    private mintService: MintService,
    private burnService: BurnService,
    private cancelService: CancelService,
    private cacheService: CacheService
  ) {}

  private getLootboxFromWalletAndTokenID = async (
    publicAddress: string,
    tokenId: number
  ) => {
    const lootboxs = await this.lootboxRepo.findOne({
      where: {
        publicAddress: publicAddress.toLowerCase(),
        tokenId,
      },
      relations: ["propertyLootbox"],
    });
    return lootboxs;
  };

  private getClaimableLootboxFromWalletAndTokenIdExpired = async (
    publicAddress: string,
    tokenId: number,
    expiredDate: number
  ) => {
    const lootboxs = await this.claimableLootboxRepo.findOne({
      where: {
        publicAddress: publicAddress.toLowerCase(),
        tokenId,
        expiredDate,
      },
    });
    return lootboxs;
  };

  private getLootboxFromWalletAndTokenIDs = async (
    publicAddress: string,
    tokenId: number[]
  ): Promise<Array<Lootbox>> => {
    const promises = [];
    for (let i = 0; i < tokenId.length; i++) {
      promises.push(
        this.getLootboxFromWalletAndTokenID(publicAddress, tokenId[i])
      );
    }
    return Promise.all(promises);
  };

  private flattenLootbox = async (
    lootboxs: Array<Lootbox>
  ): Promise<Array<any>> => {
    try {
      const flattern_lootbox = [];
      lootboxs.forEach((lootbox: Lootbox) => {
        const index = flattern_lootbox.findIndex(
          (lb: Lootbox) =>
            lb.publicAddress === lootbox.publicAddress &&
            lb.tokenId === lootbox.tokenId
        );
        if (index !== -1) flattern_lootbox[index].quantity += lootbox.quantity;
        else flattern_lootbox.push(lootbox);
      });
      return flattern_lootbox;
    } catch (error) {
      LoggerService.error(error);
      return [];
    }
  };

  private async createClaimableLootbox(lootbox: DistributeLootbox) {
    try {
      const erclootbox = await this.erc1155LootboxRepo.findOne({
        tokenId: lootbox.tokenId,
      });

      return this.addQuantityClaimedLootbox({
        publicAddress: lootbox.publicAddress.toLowerCase(),
        tokenId: lootbox.tokenId,
        quantity: lootbox.quantity,
        expiredDate: lootbox.expiredDate,
        propertyLootbox: erclootbox,
      });
    } catch (err) {
      LoggerService.error(JSON.stringify(err));
      return {};
    }
  }

  private increaseOrCreateLootbox = async (
    publicAddress: string,
    tokenId: number,
    quantity: number,
    propertyLootbox?: ERC1155Lootbox
  ) => {
    try {
      // create or update lootbox
      let lootbox = await this.getLootboxFromWalletAndTokenID(
        publicAddress.toLowerCase(),
        tokenId
      );
      if (!lootbox) {
        if (!propertyLootbox) {
          propertyLootbox = await this.erc1155LootboxRepo.findOne({
            tokenId,
          });
        }
        lootbox = this.lootboxRepo.create({
          publicAddress: publicAddress.toLowerCase(),
          tokenId,
          quantity,
          propertyLootbox,
          mintable: quantity,
        });
      } else {
        await this.verifyBlockingLootbox(lootbox);
        await this.cacheService.setBlockingLootbox(lootbox.id, true);
        lootbox.quantity += quantity;
        lootbox.mintable += quantity;
      }
      LoggerService.log(`save lootbox to  ${publicAddress}`);
      const result = this.lootboxRepo.save(lootbox);
      await this.cacheService.setBlockingLootbox(lootbox.id, true);
      return result;
    } catch (err) {
      LoggerService.error(JSON.stringify(err));
      return {};
    }
  };

  private async updateQuantityFromCanceledOrExpiredOrder(
    lootbox: Lootbox,
    amount: number
  ) {
    lootbox.mintable =
      lootbox.quantity > lootbox.mintable + amount
        ? lootbox.mintable + amount
        : lootbox.quantity;
    return this.lootboxRepo.save(lootbox);
  }

  private async verifyBlockingLootboxs(lootboxs: Lootbox[]) {
    try {
      const promisesVerify = [];
      for (let i = 0; i < lootboxs.length; i++) {
        promisesVerify.push(async () => {
          if (await this.cacheService.getBlockingLootbox(lootboxs[i].id)) {
            throw new HttpException(
              `loobox ${lootboxs[i].tokenId} is processing ! please try again after 30 seconds`,
              HttpStatus.BAD_REQUEST
            );
          }
        });
      }
      await Promise.all(promisesVerify);
    } catch (err) {
      LoggerService.error(JSON.stringify(err));
    }
  }

  private async verifyBlockingLootbox(lootbox: Lootbox) {
    try {
      if (await this.cacheService.getBlockingLootbox(lootbox.id)) {
        throw new HttpException(
          `loobox ${lootbox.tokenId} is processing ! please try again after 30 seconds`,
          HttpStatus.BAD_REQUEST
        );
      }
    } catch (error) {
      LoggerService.error(JSON.stringify(error));
    }
  }

  private async setBlockingLootboxs(lootboxs: Lootbox[], blocking: boolean) {
    try {
      const promises = [];
      for (let i = 0; i < lootboxs.length; i++) {
        promises.push(
          this.cacheService.setBlockingLootbox(lootboxs[i].id, blocking)
        );
      }
      await Promise.all(promises);
    } catch (error) {
      LoggerService.error(JSON.stringify(error));
    }
  }

  private async setBlockingLootbox(lootbox: Lootbox, blocking: boolean) {
    try {
      this.cacheService.setBlockingLootbox(lootbox.id, blocking);
    } catch (error) {
      LoggerService.error(JSON.stringify(error));
    }
  }

  private async createLootbox(
    publicAddress: string,
    tokenId: number,
    quantity: number
  ) {
    try {
      const erclootbox = await this.erc1155LootboxRepo.findOne({
        tokenId,
      });
      const _lootbox = this.lootboxRepo.create({
        publicAddress,
        quantity,
        tokenId,
        mintable: quantity,
        propertyLootbox: erclootbox,
      });
      return this.lootboxRepo.save(_lootbox);
    } catch (error) {
      LoggerService.error(JSON.stringify(error));
      return {};
    }
  }

  getLootboxById = async (id: string): Promise<Lootbox> => {
    const lootbox = await this.lootboxRepo.findOne({
      where: [
        {
          id,
        },
      ],
      relations: ["propertyLootbox"],
    });
    lootbox.propertyLootbox.image = insertDetailStringToImage(
      lootbox.propertyLootbox.image
    );
    return lootbox;
  };

  getLootboxFromWallet = async (
    publicAddress: string
  ): Promise<Array<Lootbox>> => {
    const lootboxs = await this.lootboxRepo.find({
      where: [
        {
          publicAddress: publicAddress.toLowerCase(),
          mintable: MoreThan(0),
        },
      ],
      relations: ["propertyLootbox"],
    });
    return lootboxs;
  };

  getLootboxFromUserID = async (
    userData: UserData
  ): Promise<Array<Lootbox>> => {
    const { userId, publicAddress } = userData;
    LoggerService.log(`userId:  ${userId}`);
    const promises = [];
    publicAddress.forEach((wAddress) => {
      promises.push(this.getLootboxFromWallet(wAddress));
    });
    const lootboxs = (await Promise.all(promises)).flat(1);

    return this.flattenLootbox(lootboxs);
  };

  getClaimableLootboxFromWallet = async (
    publicAddress: string
  ): Promise<Array<ClaimableLootbox>> => {
    const lootboxs = await this.claimableLootboxRepo.find({
      where: [
        {
          publicAddress: publicAddress.toLowerCase(),
          expiredDate: MoreThanOrEqual(getNow()),
          quantity: MoreThan(0),
        },
      ],
      relations: ["propertyLootbox"],
    });

    return lootboxs;
  };

  getClaimableLootboxFromUserID = async (
    userData: UserData
  ): Promise<Array<ClaimableLootbox>> => {
    const { userId, publicAddress } = userData;
    LoggerService.log(`userId:  ${userId}`);
    const promises = [];
    publicAddress.forEach((wAddress) => {
      promises.push(this.getClaimableLootboxFromWallet(wAddress));
    });
    const lootboxs = (await Promise.all(promises)).flat(1);

    return this.flattenLootbox(lootboxs);
  };

  claimLootbox = async (
    publicAddress: string
  ): Promise<Array<ClaimableLootbox>> => {
    const claimableLootbox = await this.getClaimableLootboxFromWallet(
      publicAddress
    );
    try {
      // update claimablelootbox quatity = 0
      const promisesClaimableLootbox = [];
      const promisesLootbox = [];

      for (let i = 0; i < claimableLootbox.length; i++) {
        const { quantity, tokenId, propertyLootbox } = claimableLootbox[i];
        claimableLootbox[i].quantity = 0;
        promisesClaimableLootbox.push(
          this.claimableLootboxRepo.save(claimableLootbox)
        );
        promisesLootbox.push(
          this.increaseOrCreateLootbox(
            publicAddress,
            tokenId,
            quantity,
            propertyLootbox
          )
        );
      }

      const resultClaimableLootbox = await Promise.all(
        promisesClaimableLootbox
      );
      await Promise.all(promisesLootbox);
      return resultClaimableLootbox;
    } catch (err) {
      LoggerService.error(err);
      return [];
    }
  };

  mintBatchLootbox = async (
    mintBatchLootboxInput: MintBatchLootboxInputDto
  ) => {
    try {
      const { publicAddress, batchID, amount } = mintBatchLootboxInput;

      // verify
      if (batchID.length !== amount.length)
        throw new HttpException(
          "batchID length and amount length not equal ",
          HttpStatus.BAD_REQUEST
        );

      if (
        batchID.filter((x, i, a) => a.indexOf(x) === i).length < batchID.length
      )
        throw new HttpException("duplicate batchID  ", HttpStatus.BAD_REQUEST);

      if (amount.findIndex((item) => item === 0) !== -1)
        throw new HttpException(
          "amount must not equal zero",
          HttpStatus.BAD_REQUEST
        );
      const promises = [];
      const lootboxs = await this.getLootboxFromWalletAndTokenIDs(
        publicAddress,
        batchID
      );

      // verify blocked lootbox
      await this.verifyBlockingLootboxs(lootboxs);
      await this.setBlockingLootboxs(lootboxs, true);

      for (let i = 0; i < batchID.length; i++) {
        // caculate lootbox mintable/quantity/pending
        if (!lootboxs[i])
          throw new HttpException("not have tokenId ", HttpStatus.BAD_REQUEST);
        if (lootboxs[i].mintable < amount[i])
          throw new HttpException("not enough balance", HttpStatus.BAD_REQUEST);
        lootboxs[i].mintable -= amount[i];
      }

      // update batch lootbox
      for (let i = 0; i < lootboxs.length; i++) {
        promises.push(this.lootboxRepo.save(lootboxs[i]));
      }
      await Promise.all(promises);

      this.setBlockingLootboxs(lootboxs, false); // no need wait set false

      // sign messages and save pending mint
      const pendingMint = await this.mintService.mintBatch(
        mintBatchLootboxInput
      );

      return pendingMint;
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  mintLootbox = async (mintLootboxInput: MintLootboxInputDto) => {
    try {
      const { publicAddress, batchID, amount } = mintLootboxInput;
      // verify
      if (amount === 0)
        throw new HttpException(
          "amount must not equal zero",
          HttpStatus.BAD_REQUEST
        );

      const lootbox = await this.getLootboxFromWalletAndTokenID(
        publicAddress,
        batchID
      );

      if (!lootbox) {
        throw new HttpException("not have tokenId ", HttpStatus.BAD_REQUEST);
      }

      // verify blocked lootbox
      await this.verifyBlockingLootbox(lootbox);

      await this.setBlockingLootbox(lootbox, true);

      if (lootbox.mintable < amount)
        throw new HttpException("not enough balance", HttpStatus.BAD_REQUEST);
      lootbox.mintable -= amount;

      // update lootbox
      await this.lootboxRepo.save(lootbox);
      this.setBlockingLootbox(lootbox, false); // no need wait set false

      // sign messages and save pending mint
      const pendingMint = await this.mintService.mint(mintLootboxInput);

      return pendingMint;
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  updateLootboxFromTrackerMintedBatchOrder = async (batchOrder: BatchOrder) => {
    try {
      // get pending mint
      const pending = await this.mintService.getPendingLootboxByBatchOrder(
        batchOrder
      );
      if (pending) {
        LoggerService.log(`pending : ${JSON.stringify(pending)}`);
        const lootboxs = await this.getLootboxFromWalletAndTokenIDs(
          batchOrder.to,
          batchOrder.batchID
        );

        // verify blocked lootbox
        await this.verifyBlockingLootboxs(lootboxs);
        await this.setBlockingLootboxs(lootboxs, true);

        const promises = [];
        for (let i = 0; i < batchOrder.batchID.length; i++) {
          lootboxs[i].quantity =
            lootboxs[i].quantity > batchOrder.amount[i]
              ? lootboxs[i].quantity - batchOrder.amount[i]
              : 0;
        }
        // update batch lootbox
        for (let i = 0; i < lootboxs.length; i++) {
          pending.status = MintStatus.Minted;
          promises.push(this.lootboxRepo.save(lootboxs[i]));
        }
        promises.push(this.mintService.updatePendingMint(pending));
        const result = await Promise.all(promises);

        this.setBlockingLootboxs(lootboxs, false);

        LoggerService.log(
          `update lootboxs from tracker minted done :${JSON.stringify(result)}`
        );
      } else LoggerService.log("event resoved or not in pending minted db");
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  updateLootboxFromTrackerMintedOrder = async (order: Order) => {
    try {
      // get pending mint
      const pending = await this.mintService.getPendingLootboxByOrder(order);
      if (pending) {
        LoggerService.log(`pending : ${JSON.stringify(pending)}`);
        const lootbox = await this.getLootboxFromWalletAndTokenID(
          order.to,
          order.batchID
        );

        if (lootbox) {
          // verify blocked lootbox
          await this.verifyBlockingLootbox(lootbox);
          await this.setBlockingLootbox(lootbox, true);

          lootbox.quantity =
            lootbox.quantity > order.amount
              ? lootbox.quantity - order.amount
              : 0;

          const promises = [];
          // update batch lootbox
          pending.status = MintStatus.Minted;
          promises.push(this.mintService.updatePendingMint(pending));
          promises.push(this.lootboxRepo.save(lootbox));
          const result = await Promise.all(promises);

          await this.setBlockingLootbox(lootbox, false);

          LoggerService.log(
            `update lootbox from tracker minted done :${JSON.stringify(result)}`
          );
        } else
          LoggerService.log(
            `can't find lootbox with minting info ${JSON.stringify(pending)} `
          );
      } else LoggerService.log("event resoved or not in pending mint db");
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  updateLootboxFromTrackerBurnedBatchOrder = async (batchOrder: BatchOrder) => {
    try {
      // get burned item
      const burned = await this.burnService.getBurnedBatchOrder(
        batchOrder,
        BurnType.Lootbox
      );
      if (!burned) {
        LoggerService.log(
          `recover burned batch: ${JSON.stringify(batchOrder)}`
        );

        const promises = [];
        for (let i = 0; i < batchOrder.batchID.length; i++) {
          promises.push(
            this.increaseOrCreateLootbox(
              batchOrder.to,
              batchOrder.batchID[i],
              batchOrder.amount[i]
            )
          );
        }
        const _burned = {
          to: batchOrder.to,
          salt: batchOrder.salt,
          batchIDs: batchOrder.batchID,
          amounts: batchOrder.amount,
          type: BurnType.Lootbox,
        };
        promises.push(this.burnService.createBurned(_burned));

        const result = await Promise.all(promises);
        LoggerService.log(
          `update lootbox from tracker burned batch done :${JSON.stringify(
            result
          )}`
        );
      } else LoggerService.log("event resoved or in burned database");
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  updateLootboxFromTrackerBurnedOrder = async (order: Order) => {
    try {
      // get burned tracked with salt
      const burned = await this.burnService.getBurnedSingle(
        order,
        BurnType.Lootbox
      );
      if (!burned) {
        LoggerService.log(`recover burned: ${JSON.stringify(order)}`);

        const promises = [];
        // update burned lootbox
        const _burned = {
          to: order.to,
          batchID: order.batchID,
          amount: order.amount,
          salt: order.salt,
          batchIDs: [],
          amounts: [],
          type: BurnType.Lootbox,
        };
        promises.push(this.burnService.createBurned(_burned));
        promises.push(
          this.increaseOrCreateLootbox(order.to, order.batchID, order.amount)
        );
        const result = await Promise.all(promises);

        LoggerService.log(
          `update lootbox from tracker burned done :${JSON.stringify(result)}`
        );
      } else LoggerService.log("event resoved or in burned database");
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  updateLootboxFromTrackerCancelOrder = async (signature: string) => {
    try {
      // get canceled tracked with signature

      const canceled = await this.cancelService.getCanceled(
        signature,
        CancelType.Lootbox
      );
      if (!canceled) {
        LoggerService.log(
          `recover canceled of signature: ${JSON.stringify(signature)}`
        );
        const pendingMint = await this.mintService.getPendingLootboxBySignature(
          signature
        );

        if (
          pendingMint &&
          // pendingMint.status !== MintStatus.Canceled &&
          pendingMint.status !== MintStatus.Expired &&
          pendingMint.status !== MintStatus.Minted
        ) {
          pendingMint.status = MintStatus.Canceled;
          await this.mintService.updatePendingMint(pendingMint);
          const tokenIds =
            pendingMint.batchIDs.length > 0
              ? pendingMint.batchIDs
              : [pendingMint.batchID];
          const amounts =
            pendingMint.batchIDs.length > 0
              ? pendingMint.amounts
              : [pendingMint.amount];
          const lootboxs = await this.getLootboxFromWalletAndTokenIDs(
            pendingMint.to,
            tokenIds
          );

          // verify blocked lootbox
          await this.verifyBlockingLootboxs(lootboxs);
          await this.setBlockingLootboxs(lootboxs, true);

          const promises = [];
          // update canceled lootbox
          const _canceled = {
            signature,
            type: CancelType.Lootbox,
          };

          promises.push(this.cancelService.createCanceled(_canceled));
          for (let i = 0; i < tokenIds.length; i++) {
            promises.push(
              this.updateQuantityFromCanceledOrExpiredOrder(
                lootboxs[i],
                amounts[i]
              )
            );
          }
          const result = await Promise.all(promises);

          this.setBlockingLootboxs(lootboxs, false);

          LoggerService.log(
            `update lootbox from tracker canceled done :${JSON.stringify(
              result
            )}`
          );
        } else LoggerService.log("not recover lootbox cause lootbox minted");
      } else LoggerService.log("event resoved or in cancel database");
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  updateLootboxFromTrackerExpiredOrder = async (pendingMint: PendingMint) => {
    try {
      // get expired tracked with signature

      LoggerService.log(`recover expired of publicAddress: ${pendingMint.to}`);
      if (
        pendingMint &&
        pendingMint.status !== MintStatus.Expired &&
        pendingMint.status !== MintStatus.Minted &&
        pendingMint.status !== MintStatus.Canceled
      ) {
        pendingMint.status = MintStatus.Expired;
        await this.mintService.updatePendingMint(pendingMint);
        const tokenIds =
          pendingMint.batchIDs.length > 0
            ? pendingMint.batchIDs
            : [pendingMint.batchID];
        const amounts =
          pendingMint.batchIDs.length > 0
            ? pendingMint.amounts
            : [pendingMint.amount];
        const lootboxs = await this.getLootboxFromWalletAndTokenIDs(
          pendingMint.to,
          tokenIds
        );

        // verify blocked lootbox
        await this.verifyBlockingLootboxs(lootboxs);
        await this.setBlockingLootboxs(lootboxs, true);

        const promises = [];
        for (let i = 0; i < tokenIds.length; i++) {
          if (lootboxs[i]) {
            promises.push(
              this.updateQuantityFromCanceledOrExpiredOrder(
                lootboxs[i],
                amounts[i]
              )
            );
          } else
            throw new HttpException(
              "can't find lootbox of pending mint expired ",
              HttpStatus.BAD_REQUEST
            );
        }
        const result = await Promise.all(promises);

        this.setBlockingLootboxs(lootboxs, false);

        LoggerService.log(
          `update lootbox from tracker for wallet ${
            pendingMint.to
          } expired done :${JSON.stringify(result)}`
        );
      } else
        LoggerService.log(
          "not recover lootbox cause lootbox minted or canceled"
        );
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("something was wrong", HttpStatus.BAD_REQUEST);
    }
  };

  async addQuantityClaimedLootbox(
    claimableLootbox: ClaimableLootbox
  ): Promise<ClaimableLootbox> {
    try {
      let lootbox = await this.getClaimableLootboxFromWalletAndTokenIdExpired(
        claimableLootbox.publicAddress.toLowerCase(),
        claimableLootbox.tokenId,
        claimableLootbox.expiredDate
      );

      if (!lootbox) {
        lootbox = this.claimableLootboxRepo.create(claimableLootbox);
      } else {
        lootbox.quantity += claimableLootbox.quantity;
      }
      LoggerService.log(
        `save claimable lootbox to  ${claimableLootbox.publicAddress}`
      );
      return this.claimableLootboxRepo.save(lootbox);
    } catch (err) {
      LoggerService.log(` ${err}`);
    }
  }

  distributeLootbox = async (data: DistributeLootbox) => {
    try {
      return this.createClaimableLootbox(data);
    } catch (err) {
      return err;
    }
  };

  distributesLootbox = async (data: DistributeLootbox[]) => {
    const promises = [];

    for (let i = 0; i < data.length; i++) {
      promises.push(this.createClaimableLootbox(data[i]));
    }
    try {
      return Promise.all(promises);
    } catch (err) {
      return err;
    }
  };

  async getDataLootboxTableForAdmin(from: number, take: number) {
    const data = await this.lootboxRepo.find({
      relations: ["propertyLootbox"],
      skip: from,
      take,
    });
    return { total: data.length, data };
  }

  async getDataClaimableLootboxTableForAdmin(from: number, take: number) {
    const data = await this.claimableLootboxRepo.find({
      relations: ["propertyLootbox"],
      skip: from,
      take,
    });
    return { total: data.length, data };
  }

  async updateDataClaimableLootboxTableForAdmin(
    claimableLootbox: ClaimableLootbox
  ) {
    return this.claimableLootboxRepo.save(claimableLootbox);
  }

  async updateDataLootboxTableForAdmin(lootbox: Lootbox) {
    return this.lootboxRepo.save(lootbox);
  }
}
