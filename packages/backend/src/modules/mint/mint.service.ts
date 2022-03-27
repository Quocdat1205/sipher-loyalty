// import library
import { toChecksumAddress } from "ethereumjs-util";
import { In, Repository } from "typeorm";
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
import { getDeadline3Day, randomSalt } from "@utils/utils";

import { LoggerService } from "../logger/logger.service";

import { BodyUpdatePendingMint } from "./mint.type";

@Injectable()
export class MintService {
  private infoPendings: Array<{ name: string; image: string }>;

  private config = constant.config.erc1155Spaceship;

  constructor(
    @InjectRepository(PendingMint)
    private PendingMintRepo: Repository<PendingMint>,
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>
  ) {
    this.genInfoPendings();
  }

  private genInfoPendings = async () => {
    this.infoPendings = (await this.erc1155LootboxRepo.find())
      .sort((a, b) => parseInt(a.tokenId, 10) - parseInt(b.tokenId, 10))
      .map((el) => ({ name: el.name, image: el.image }));
  };

  getPendingLootbox = async (publicAddress: string) => {
    const pendings = await this.PendingMintRepo.find({
      where: [
        {
          to: In([
            publicAddress.toLowerCase(),
            toChecksumAddress(publicAddress),
          ]),
          type: MintType.Lootbox,
          status: In([MintStatus.Minting, MintStatus.Reject, MintStatus.Error]),
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
              image: this.infoPendings[element.batchID].image,
              name: this.infoPendings[element.batchID].name,
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
            image: this.infoPendings[element.batchIDs[i]].image,
            name: this.infoPendings[element.batchIDs[i]].name,
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
          to: In([
            batchOrder.to.toLowerCase(),
            toChecksumAddress(batchOrder.to),
          ]),
          type: MintType.Lootbox,
          status: MintStatus.Minting,
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
          to: In([order.to.toLowerCase(), toChecksumAddress(order.to)]),
          type: MintType.Lootbox,
          status: MintStatus.Minting,
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
    LoggerService.log(`update pending mint : ${JSON.stringify(pendingMint)}`);
    return this.PendingMintRepo.save(pendingMint);
  }

  async mintBatch(mintBatchLootboxInput: MintBatchLootboxInput) {
    mintBatchLootboxInput.deadline = getDeadline3Day();
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
      status: MintStatus.Minting,
      deadline,
    };
    const pendingMint = this.PendingMintRepo.create(pendingBatchOrder);
    LoggerService.log(`save pending mint batch to ${publicAddress}`);
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
    mintLootboxInput.deadline = getDeadline3Day();
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
      status: MintStatus.Minting,
      deadline,
    };
    const signature = await signOrder(this.config, order);
    order.signature = signature;
    const pendingMint = this.PendingMintRepo.create(order);
    LoggerService.log(`save pending mint to ${publicAddress}`);
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

  updateStatusPendingLootbox = async (
    bodyUpdatePendingMint: BodyUpdatePendingMint
  ) => {
    const pending = await this.PendingMintRepo.findOne({
      id: bodyUpdatePendingMint.id,
    });
    if (!pending)
      throw new HttpException(
        `Not found pending mint id ${bodyUpdatePendingMint.id}`,
        HttpStatus.BAD_REQUEST
      );
    // verify status pending mint transform to
    if (
      bodyUpdatePendingMint.status !== MintStatus.Reject &&
      bodyUpdatePendingMint.status !== MintStatus.Error &&
      bodyUpdatePendingMint.status !== MintStatus.Minting &&
      bodyUpdatePendingMint.status !== MintStatus.Minted
    )
      throw new HttpException(
        `Not allow update from ${pending.status} to ${bodyUpdatePendingMint.status} for pending mint id ${bodyUpdatePendingMint.id}`,
        HttpStatus.BAD_REQUEST
      );
    // verify status pending mint transform from
    if (
      pending.status !== MintStatus.Reject &&
      pending.status !== MintStatus.Error &&
      pending.status !== MintStatus.Minting
    )
      throw new HttpException(
        `Not allow update from ${pending.status} to ${bodyUpdatePendingMint.status} for pending mint id ${bodyUpdatePendingMint.id}`,
        HttpStatus.BAD_REQUEST
      );

    pending.status = bodyUpdatePendingMint.status;
    return this.PendingMintRepo.save(pending);
  };
}
