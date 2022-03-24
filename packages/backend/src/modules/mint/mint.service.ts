// import library
import { toChecksumAddress } from "ethereumjs-util";
import { date } from "joi";
import { Repository } from "typeorm";
import { ERC1155Lootbox, MintStatus, MintType, PendingMint } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import {
  MintBatchLootboxInput,
  MintLootboxInput,
} from "@modules/lootbox/lootbox.type";
import {
  recoverBatchOrderSignature,
  recoverOrderSignature,
} from "@utils/recover";
import { signBatchOrder, signOrder } from "@utils/signer";
import { BatchOrder, Order } from "@utils/type";
import { randomSalt } from "@utils/utils";

import { LoggerService } from "../logger/logger.service";

@Injectable()
export class MintService {
  constructor(
    @InjectRepository(PendingMint)
    private PendingMintRepo: Repository<PendingMint>,
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>
  ) {}

  private config = constant.config.erc1155Spaceship;

  getPendingLootbox = async (publicAddress: string) => {
    const imageBaseUrl =
      "https://sipherstorage.s3.ap-southeast-1.amazonaws.com/loyalty/erc1155/lootbox/lootbox";
    const pendings = await this.PendingMintRepo.find({
      where: [
        {
          to: publicAddress.toLowerCase(),
          type: MintType.Lootbox,
          status: MintStatus.Pending,
        },
        {
          to: toChecksumAddress(publicAddress),
          type: MintType.Lootbox,
          status: MintStatus.Pending,
        },
      ],
    });
    const data = [];
    pendings.forEach((element) => {
      if (element.batchID) {
        const pending = {
          ...element,
          info: [
            {
              tokenId: element.batchID,
              quantity: element.amount,
              image: `${imageBaseUrl}_${element.batchID}.png`,
            },
          ],
        };
        data.push(pending);
      } else {
        const info = [];
        for (let i = 0; i < element.batchIDs.length; i++) {
          info.push({
            tokenId: element.batchIDs[i],
            quantity: element.amounts[i],
            image: `${imageBaseUrl}_${element.batchIDs[i]}.png`,
          });
        }
        const pending = {
          ...element,
          info,
        };
        data.push(pending);
      }
    });
    return data;
  };

  getPendingLootboxByBatchOrder = async (batchOrder: BatchOrder) => {
    const pending = await this.PendingMintRepo.findOne({
      where: [
        {
          to: batchOrder.to.toLowerCase(),
          type: MintType.Lootbox,
          status: MintStatus.Pending,
          salt: batchOrder.salt,
          batchIDs: batchOrder.batchID,
          amounts: batchOrder.amount,
        },
        {
          to: toChecksumAddress(batchOrder.to),
          type: MintType.Lootbox,
          status: MintStatus.Pending,
          salt: batchOrder.salt,
          batchIDs: batchOrder.batchID,
          amounts: batchOrder.amount,
        },
      ],
    });
    return pending;
  };

  getPendingLootboxBySignature = async (signature: string) => {
    const pending = await this.PendingMintRepo.findOne({ signature });
    return pending;
  };

  getPendingLootboxByOrder = async (order: Order) => {
    const pending = await this.PendingMintRepo.findOne({
      where: [
        {
          to: order.to.toLowerCase(),
          type: MintType.Lootbox,
          status: MintStatus.Pending,
          salt: order.salt,
          batchID: order.batchID,
          amount: order.amount,
          batchIDs: [],
          amounts: [],
        },
        {
          to: toChecksumAddress(order.to),
          type: MintType.Lootbox,
          status: MintStatus.Pending,
          salt: order.salt,
          batchID: order.batchID,
          amount: order.amount,
          batchIDs: [],
          amounts: [],
        },
      ],
    });

    return pending;
  };

  async updatePendingMint(pendingMint: PendingMint) {
    LoggerService.log(`update pending mint : ${pendingMint}`);
    return this.PendingMintRepo.save(pendingMint);
  }

  async mintBatch(mintBatchLootboxInput: MintBatchLootboxInput) {
    mintBatchLootboxInput.deadline =
      new Date().getTime() / 1000 + constant.PENDING_TIME_LOOTBOX_MINT;
    const { publicAddress, batchID, amount, deadline } = mintBatchLootboxInput;
    LoggerService.log(
      `sign mint data for ${publicAddress},${batchID},${amount},${deadline}`
    );

    const batchOrder = {
      to: publicAddress,
      batchID,
      amount,
      salt: randomSalt(),
      signature: "",
      deadline,
    };
    const signature = await signBatchOrder(this.config, batchOrder);
    batchOrder.signature = signature;
    const pendingBatchOrder = {
      to: publicAddress,
      batchIDs: batchID,
      amounts: amount,
      salt: batchOrder.salt,
      signature,
      type: MintType.Lootbox,
      status: MintStatus.Pending,
      deadline,
    };
    const pendingMint = this.PendingMintRepo.create(pendingBatchOrder);
    LoggerService.log("save pending mint to ", publicAddress);
    await this.PendingMintRepo.save(pendingMint);
    const verifySignature = recoverBatchOrderSignature(
      batchOrder,
      signature,
      this.config
    );
    if (!verifySignature)
      throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST);
    return pendingMint;
  }

  async mint(mintLootboxInput: MintLootboxInput) {
    mintLootboxInput.deadline =
      new Date().getTime() / 1000 + constant.PENDING_TIME_LOOTBOX_MINT;
    const { publicAddress, batchID, amount, deadline } = mintLootboxInput;
    LoggerService.log(
      `sign mint data for ${publicAddress},${batchID},${amount},${deadline}`
    );

    const order = {
      to: publicAddress,
      batchID,
      amount,
      salt: randomSalt(),
      signature: "",
      type: MintType.Lootbox,
      status: MintStatus.Pending,
      deadline,
    };
    const signature = await signOrder(this.config, order);
    order.signature = signature;
    const pendingMint = this.PendingMintRepo.create(order);
    LoggerService.log("save pending mint to ", publicAddress);
    await this.PendingMintRepo.save(pendingMint);

    const verifySignature = recoverOrderSignature(
      order,
      signature,
      this.config
    );
    if (!verifySignature)
      throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST);
    return pendingMint;
  }
}
