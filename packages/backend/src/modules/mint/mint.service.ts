// import library
import { toChecksumAddress } from "ethereumjs-util";
import { Repository } from "typeorm";
import { MintStatus, MintType, PendingMint } from "@entity";
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
    private PendingMintRepo: Repository<PendingMint>
  ) {}

  private config = constant.config.erc1155Spaceship;

  // async test() {
  //   LoggerService.log(
  //     `sign mint data for 0x83629905189464CC16F5E7c12D54dD5e87459B33, id : [1] ,amount : [2]`
  //   );
  //   LoggerService.log(this.config);
  //   const order = {
  //     to: "0x83629905189464CC16F5E7c12D54dD5e87459B33",
  //     batchID: 1,
  //     amount: 2,
  //     salt: "0x",
  //   };
  //   const batchOrder = {
  //     to: "0x83629905189464CC16F5E7c12D54dD5e87459B33",
  //     batchID: [1],
  //     amount: [2],
  //     salt: "0x",
  //   };

  //   const signature = await signOrder(this.config, order);

  //   const signatureBatch = await signBatchOrder(this.config, batchOrder);

  //   const verifySignature = recoverOrderSignature(
  //     order,
  //     signature,
  //     this.config
  //   );
  //   const verifySignatureBatch = recoverBatchOrderSignature(
  //     batchOrder,
  //     signatureBatch,
  //     this.config
  //   );
  //   if (!verifySignature)
  //     throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST);
  //   if (!verifySignatureBatch)
  //     throw new HttpException("wrong signature batch", HttpStatus.BAD_REQUEST);

  //   // const signatureTest = await signer._signTypedData(
  //   //   createEIP712Domain(this.config.chainId, this.config.verifyingContract),
  //   //   {
  //   //     Test: [{ name: "id", type: "bytes" }],
  //   //   },
  //   //   { id: defaultAbiCoder.encode(["uint256[]"], [[1]]) },
  //   // )

  //   return { signature, signatureBatch };
  // }

  getPendingLootbox = async (publicAddress: string) => {
    const pending = await this.PendingMintRepo.find({
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
    return pending;
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
    const { publicAddress, batchID, amount } = mintBatchLootboxInput;
    LoggerService.log(
      `sign mint data for ${publicAddress},${batchID},${amount}`
    );

    const batchOrder = {
      to: publicAddress,
      batchID,
      amount,
      salt: randomSalt(),
      signature: "",
    };

    const signature = await signBatchOrder(this.config, batchOrder);
    batchOrder.signature = signature;
    const order = {
      to: publicAddress,
      batchIDs: batchID,
      amounts: amount,
      salt: batchOrder.salt,
      signature,
      type: MintType.Lootbox,
      status: MintStatus.Pending,
    };
    const pendingMint = this.PendingMintRepo.create(order);
    LoggerService.log("save pending mint to ", publicAddress);
    await this.PendingMintRepo.save(pendingMint);
    const verifySignature = recoverBatchOrderSignature(
      batchOrder,
      signature,
      this.config
    );
    if (!verifySignature)
      throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST);
    return signature;
  }

  async mint(mintLootboxInput: MintLootboxInput) {
    const { publicAddress, batchID, amount } = mintLootboxInput;
    LoggerService.log(
      `sign mint data for ${publicAddress},${batchID},${amount}`
    );

    const order = {
      to: publicAddress,
      batchID,
      amount,
      salt: randomSalt(),
      signature: "",
      type: MintType.Lootbox,
      status: MintStatus.Pending,
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
    return signature;
  }
}
