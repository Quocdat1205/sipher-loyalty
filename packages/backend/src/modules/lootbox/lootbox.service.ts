import { toChecksumAddress } from "ethereumjs-util";
import { Contract, providers } from "ethers";
import { MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { BurnType, Lootbox, MintStatus } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { erc721Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant from "@setting/constant";

import { UserData } from "@modules/auth/auth.types";
import { BurnService } from "@modules/burn/burn.service";
import { MintService } from "@modules/mint/mint.service";
import { BatchOrder, Order } from "@utils/type";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

import { LoggerService } from "../logger/logger.service";

import { MintBatchLootboxInput, MintLootboxInput } from "./lootbox.type";

@Injectable()
export class LootBoxService {
  private provider: providers.Provider;

  private InuContract: Contract;

  private NekoContract: Contract;

  constructor(
    @InjectRepository(Lootbox) private lootboxRepo: Repository<Lootbox>,
    @InjectRepository(ClaimableLootbox)
    private claimableLootboxRepo: Repository<ClaimableLootbox>,
    private mintService: MintService,
    private burnService: BurnService
  ) {
    this.provider = getProvider(constant.CHAIN_ID);
    this.InuContract = getContract(
      constant.SC_NFT_INU,
      erc721Abi,
      this.provider
    );
    this.NekoContract = getContract(
      constant.SC_NFT_NEKO,
      erc721Abi,
      this.provider
    );
  }

  // @Cron("0 0 0 * * 0")
  // async handleCron() {
  //   LoggerService.log("Start distribute claimable lootbox! ");
  //   await this.weeklySnapshotForClaimableLootbox();
  //   LoggerService.log("Distribute claimable lootbox finished! ");
  // }

  private distributeClaimableLootbox = async (
    nftContract: Contract,
    i: number,
    tokenId: number
  ) => {
    try {
      const expiredDate = new Date(new Date().getTime() / 1000 + 86400 * 7);
      const publicAddress: string = await nftContract.ownerOf(i);
      let lootbox = await this.getClaimableLootboxFromWalletAndTokenIdExpired(
        publicAddress,
        tokenId,
        expiredDate
      );

      if (!lootbox) {
        lootbox = this.claimableLootboxRepo.create({
          publicAddress,
          tokenId,
          quantity: 1,
          expiredDate,
        });
      } else {
        lootbox.quantity++;
      }
      LoggerService.log(`save claimable lootbox to  ${publicAddress}`);
      await this.claimableLootboxRepo.save(lootbox);
    } catch (err) {
      LoggerService.log(`err at ${i}, ${err}`);
    }
  };

  private distributeClaimableLootboxForContract = async (
    nftContract: Contract,
    typeId: number
  ) => {
    const promises = [];
    if (typeId !== 6) {
      // random id if week 7 (typeID = 6 )
      for (let i = 1; i <= 10000; i++) {
        promises.push(this.distributeClaimableLootbox(nftContract, i, typeId));
      }
    } else
      for (let i = 1; i <= 10000; i++) {
        promises.push(
          this.distributeClaimableLootbox(
            nftContract,
            i,
            Math.round(Math.random() * 5)
          )
        );
      }
    await Promise.all(promises);
  };

  private takeSnapshot = async (typeId: number) => {
    switch (typeId) {
      case 0: // CHIM CHIM inu + neko
        await this.distributeClaimableLootboxForContract(
          this.InuContract,
          typeId
        );
        await this.distributeClaimableLootboxForContract(
          this.NekoContract,
          typeId
        );
        break;
      case 1: // SWORDFISH inu + neko
        await this.distributeClaimableLootboxForContract(
          this.InuContract,
          typeId
        );
        await this.distributeClaimableLootboxForContract(
          this.NekoContract,
          typeId
        );
        break;
      case 2: // MANTA inu + neko
        await this.distributeClaimableLootboxForContract(
          this.InuContract,
          typeId
        );
        await this.distributeClaimableLootboxForContract(
          this.NekoContract,
          typeId
        );
        break;
      case 3: // OTTER inu + neko
        await this.distributeClaimableLootboxForContract(
          this.InuContract,
          typeId
        );
        await this.distributeClaimableLootboxForContract(
          this.NekoContract,
          typeId
        );
        break;
      case 4: // DODO neko
        await this.distributeClaimableLootboxForContract(
          this.NekoContract,
          typeId
        );
        break;
      case 5: // TUI inu
        await this.distributeClaimableLootboxForContract(
          this.InuContract,
          typeId
        );
        break;
      case 6: // random(0->5) inu
        await this.distributeClaimableLootboxForContract(
          this.InuContract,
          typeId
        );
        break;
      default:
        break;
    }
  };

  private getLootboxFromWalletAndTokenID = async (
    publicAddress: string,
    tokenId: number
  ) => {
    const lootboxs = await this.lootboxRepo.findOne({
      where: [
        { publicAddress: toChecksumAddress(publicAddress), tokenId },
        { publicAddress: publicAddress.toLowerCase(), tokenId },
      ],
      relations: ["propertyLootbox"],
    });
    return lootboxs;
  };

  private getClaimableLootboxFromWalletAndTokenIdExpired = async (
    publicAddress: string,
    tokenId: number,
    expiredDate: Date
  ) => {
    const lootboxs = await this.claimableLootboxRepo.findOne({
      where: [
        {
          publicAddress: toChecksumAddress(publicAddress),
          tokenId,
          expiredDate,
        },
        { publicAddress: publicAddress.toLowerCase(), tokenId, expiredDate },
      ],
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
  };

  private upsertLootbox = async (
    publicAddress: string,
    tokenId: number,
    quantity: number
  ) => {
    // create or update lootbox
    let lootbox = await this.getLootboxFromWalletAndTokenID(
      publicAddress,
      tokenId
    );
    if (!lootbox) {
      lootbox = this.lootboxRepo.create({
        publicAddress,
        tokenId,
        quantity,
      });
    } else {
      lootbox.quantity += quantity;
    }
    LoggerService.log(`save lootbox to  ${publicAddress}`);
    return this.lootboxRepo.save(lootbox);
  };

  claimLootbox = async (
    publicAddress: string
  ): Promise<Array<ClaimableLootbox>> => {
    const claimableLootbox = await this.getClaimableLootboxFromWallet(
      publicAddress
    );

    // update claimablelootbox quatity = 0
    const promisesClaimableLootbox = [];
    const promisesLootbox = [];
    for (let i = 0; i < claimableLootbox.length; i++) {
      const { quantity, tokenId } = claimableLootbox[i];
      claimableLootbox[i].quantity = 0;
      promisesClaimableLootbox.push(
        this.claimableLootboxRepo.save(claimableLootbox)
      );
      promisesLootbox.push(
        this.upsertLootbox(publicAddress, tokenId, quantity)
      );
    }

    const resultClaimableLootbox = await Promise.all(promisesClaimableLootbox);
    await Promise.all(promisesLootbox);
    return resultClaimableLootbox;
  };

  weeklySnapshotForClaimableLootbox = async () => {
    const typeId =
      Math.floor(Math.abs(new Date().getTime() - 1648771200) / (86400 * 49)) %
      7;
    await this.takeSnapshot(typeId);
  };

  getLootboxFromWallet = async (
    publicAddress: string
  ): Promise<Array<Lootbox>> => {
    const lootboxs = await this.lootboxRepo.find({
      where: [
        { publicAddress: toChecksumAddress(publicAddress) },
        { publicAddress: publicAddress.toLowerCase() },
      ],
      relations: ["propertyLootbox"],
    });
    return lootboxs;
  };

  getLootboxFromUserID = async (
    userData: UserData
  ): Promise<Array<Lootbox>> => {
    const { userID, publicAddress } = userData;
    LoggerService.log(`userID:  ${userID}`);
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
          publicAddress: toChecksumAddress(publicAddress),
          expiredDate: MoreThanOrEqual(new Date()),
          quantity: MoreThan(0),
        },
        {
          publicAddress: publicAddress.toLowerCase(),
          expiredDate: MoreThanOrEqual(new Date()),
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
    const { userID, publicAddress } = userData;
    LoggerService.log(`userID:  ${userID}`);
    const promises = [];
    publicAddress.forEach((wAddress) => {
      promises.push(this.getClaimableLootboxFromWallet(wAddress));
    });
    const lootboxs = (await Promise.all(promises)).flat(1);

    return this.flattenLootbox(lootboxs);
  };

  mintBatchLootbox = async (mintBatchLootboxInput: MintBatchLootboxInput) => {
    const { publicAddress, batchID, amount } = mintBatchLootboxInput;

    // verify
    if (batchID.length !== amount.length)
      throw new HttpException(
        "batchID length and amount length not equal ",
        HttpStatus.BAD_REQUEST
      );

    if (batchID.filter((x, i, a) => a.indexOf(x) === i).length < batchID.length)
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
    for (let i = 0; i < batchID.length; i++) {
      if (!lootboxs[i])
        throw new HttpException("not have tokenId ", HttpStatus.BAD_REQUEST);
      if (lootboxs[i].quantity - lootboxs[i].pending < amount[i])
        throw new HttpException("not enough balance", HttpStatus.BAD_REQUEST);
      lootboxs[i].pending += amount[i];
    }

    // update batch lootbox
    for (let i = 0; i < lootboxs.length; i++) {
      promises.push(this.lootboxRepo.save(lootboxs[i]));
    }

    // sign messages and save pending mint
    const signanture = await this.mintService.mintBatch(mintBatchLootboxInput);

    // get pending mint
    const pending = await this.mintService.getPendingLootbox(publicAddress);

    const data = await Promise.all(promises);
    return { signanture, data, pending };
  };

  mintLootbox = async (mintLootboxInput: MintLootboxInput) => {
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
    if (!lootbox)
      throw new HttpException("not have tokenId ", HttpStatus.BAD_REQUEST);
    if (lootbox.quantity - lootbox.pending < amount)
      throw new HttpException("not enough balance", HttpStatus.BAD_REQUEST);
    lootbox.pending += amount;

    // update lootbox
    const data = await this.lootboxRepo.save(lootbox);

    // sign messages and save pending mint
    const signanture = await this.mintService.mint(mintLootboxInput);

    // get pending mint
    const pending = await this.mintService.getPendingLootbox(publicAddress);

    return { signanture, data, pending };
  };

  updateLootboxFromTrackerMintedBatchOrder = async (batchOrder: BatchOrder) => {
    // get pending mint

    const pending = await this.mintService.getPendingLootboxByBatchOrder(
      batchOrder
    );
    if (pending && pending.length > 0) {
      LoggerService.log(`pending : ${pending}`);
      const lootboxs = await this.getLootboxFromWalletAndTokenIDs(
        batchOrder.to,
        batchOrder.batchID
      );
      const promises = [];
      for (let i = 0; i < batchOrder.batchID.length; i++) {
        lootboxs[i].pending =
          lootboxs[i].pending > batchOrder.amount[i]
            ? lootboxs[i].pending - batchOrder.amount[i]
            : 0;
        lootboxs[i].quantity =
          lootboxs[i].quantity > batchOrder.amount[i]
            ? lootboxs[i].quantity - batchOrder.amount[i]
            : 0;
      }
      // update batch lootbox
      for (let i = 0; i < lootboxs.length; i++) {
        pending[i].status = MintStatus.Minted;
        promises.push(this.mintService.updatePendingMint(pending[i]));
        promises.push(this.lootboxRepo.save(lootboxs[i]));
      }
      const result = await Promise.all(promises);
      LoggerService.log(
        `update lootboxs from tracker minted done :${JSON.stringify(result)}`
      );
    } else LoggerService.log("event resoved or not in pending minted db");
  };

  updateLootboxFromTrackerMintedOrder = async (order: Order) => {
    // get pending mint

    const pending = await this.mintService.getPendingLootboxByOrder(order);
    if (pending) {
      LoggerService.log(`pending : ${pending}`);
      const lootbox = await this.getLootboxFromWalletAndTokenID(
        order.to,
        order.batchID
      );
      lootbox.pending =
        lootbox.pending > order.amount ? lootbox.pending - order.amount : 0;
      lootbox.quantity =
        lootbox.quantity > order.amount ? lootbox.quantity - order.amount : 0;

      const promises = [];
      // update batch lootbox
      pending.status = MintStatus.Minted;
      promises.push(this.mintService.updatePendingMint(pending));
      promises.push(this.lootboxRepo.save(lootbox));
      const result = await Promise.all(promises);
      LoggerService.log(
        `update lootbox from tracker minted done :${JSON.stringify(result)}`
      );
    } else LoggerService.log("event resoved or not in pending minted db");
  };

  updateLootboxFromTrackerBurnedBatchOrder = async (batchOrder: BatchOrder) => {
    // get pending mint

    const burned = await this.burnService.getBurnedBatchOrder(batchOrder);
    if (!burned) {
      LoggerService.log(`recover burned : ${burned}`);
      const lootboxs = await this.getLootboxFromWalletAndTokenIDs(
        batchOrder.to,
        batchOrder.batchID
      );
      const promises = [];
      for (let i = 0; i < batchOrder.batchID.length; i++) {
        lootboxs[i].quantity += batchOrder.amount[i];
      }
      // update batch lootbox
      const _burned = {
        to: batchOrder.to,
        salt: batchOrder.salt,
        batchIDs: batchOrder.batchID,
        amounts: batchOrder.amount,
        type: BurnType.Lootbox,
      };
      promises.push(this.burnService.createBurned(_burned));
      for (let i = 0; i < lootboxs.length; i++) {
        promises.push(this.lootboxRepo.save(lootboxs[i]));
      }
      const result = await Promise.all(promises);
      LoggerService.log(
        `update lootbox from tracker burned done :${JSON.stringify(result)}`
      );
    } else LoggerService.log("event resoved or in burned database");
  };

  updateLootboxFromTrackerBurnedOrder = async (order: Order) => {
    // get burned tracked with salt

    const burned = await this.burnService.getBurnedSingle(order);
    if (!burned) {
      LoggerService.log(`burned : ${burned}`);
      const lootbox = await this.getLootboxFromWalletAndTokenID(
        order.to,
        order.batchID
      );
      lootbox.quantity += order.amount;

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
      promises.push(this.lootboxRepo.save(lootbox));
      const result = await Promise.all(promises);
      LoggerService.log(
        `update lootbox from tracker burned done :${JSON.stringify(result)}`
      );
    } else LoggerService.log("event resoved or in burned database");
  };

  async upsertClaimedLootbox(
    claimableLootbox: ClaimableLootbox
  ): Promise<ClaimableLootbox> {
    try {
      let lootbox = await this.getClaimableLootboxFromWalletAndTokenIdExpired(
        claimableLootbox.publicAddress,
        claimableLootbox.tokenId,
        claimableLootbox.expiredDate
      );

      if (!lootbox) {
        lootbox = this.claimableLootboxRepo.create(claimableLootbox);
      } else {
        lootbox.quantity++;
      }
      LoggerService.log(
        `save claimable lootbox to  ${claimableLootbox.publicAddress}`
      );
      return this.claimableLootboxRepo.save(lootbox);
    } catch (err) {
      LoggerService.log(` ${err}`);
    }
  }
}
