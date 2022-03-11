// import library
import { toChecksumAddress } from "ethereumjs-util"
import { Repository } from "typeorm"
import { MintStatus, MintType, PendingMint } from "@entity"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import constant from "@setting/constant"

import { MintBatchLootboxInput, MintLootboxInput } from "@modules/lootbox/lootbox.type"
import { recoverBatchOrderSignature, recoverOrderSignature } from "@utils/recover"
import { signBatchOrder, signOrder } from "@utils/signer"
import { randomSalt } from "@utils/utils"

import { AuthService } from "../auth/auth.service"
import { LoggerService } from "../logger/logger.service"

@Injectable()
export class MintService {
  constructor(
    @InjectRepository(PendingMint) private PendingMintRepo: Repository<PendingMint>,
    private authService: AuthService,
  ) {}

  private config = constant.config.erc1155Spaceship

  async test() {
    LoggerService.log(`sign mint data for 0x83629905189464CC16F5E7c12D54dD5e87459B33, id : [1] ,amount : [2]`)
    LoggerService.log(this.config)
    const order = {
      to: "0x83629905189464CC16F5E7c12D54dD5e87459B33",
      batchID: 1,
      amount: 2,
      salt: "0x",
    }
    const batchOrder = {
      to: "0x83629905189464CC16F5E7c12D54dD5e87459B33",
      batchID: [1],
      amount: [2],
      salt: "0x",
    }

    const signature = await signOrder(this.config, order)

    const signatureBatch = await signBatchOrder(this.config, batchOrder)

    const verifySignature = recoverOrderSignature(order, signature, this.config)
    const verifySignatureBatch = recoverBatchOrderSignature(batchOrder, signatureBatch, this.config)
    if (!verifySignature) throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST)
    if (!verifySignatureBatch) throw new HttpException("wrong signature batch", HttpStatus.BAD_REQUEST)

    // const signatureTest = await signer._signTypedData(
    //   createEIP712Domain(this.config.chainId, this.config.verifyingContract),
    //   {
    //     Test: [{ name: "id", type: "bytes" }],
    //   },
    //   { id: defaultAbiCoder.encode(["uint256[]"], [[1]]) },
    // )

    return { signature, signatureBatch }
  }

  getPendingLootbox = async (walletAddress: string) => {
    const pending = this.PendingMintRepo.find({
      where: [
        { to: walletAddress.toLowerCase(), type: MintType.Lootbox, status: MintStatus.Pending },
        { to: toChecksumAddress(walletAddress), type: MintType.Lootbox, status: MintStatus.Pending },
      ],
    })
    return pending
  }

  async mintBatch(mintBatchLootboxInput: MintBatchLootboxInput) {
    const { walletAddress, batchID, amount } = mintBatchLootboxInput
    LoggerService.log(`sign mint data for ${walletAddress},${batchID},${amount}`)

    const batchOrder = {
      to: walletAddress,
      batchID,
      amount,
      salt: randomSalt(),
      signature: "",
    }

    const signature = await signBatchOrder(this.config, batchOrder)
    batchOrder.signature = signature
    const promises = []
    for (let i = 0; i < batchID.length; i++) {
      const order = {
        to: walletAddress,
        batchID: batchID[i],
        amount: amount[i],
        batchIDs: batchID,
        amounts: amount,
        salt: batchOrder.salt,
        signature,
        type: MintType.Lootbox,
        status: MintStatus.Pending,
      }
      const pendingMint = this.PendingMintRepo.create(order)
      LoggerService.log("save pending mint to ", walletAddress)
      promises.push(this.PendingMintRepo.save(pendingMint))
    }
    await Promise.all(promises)
    const verifySignature = recoverBatchOrderSignature(batchOrder, signature, this.config)
    if (!verifySignature) throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST)
    return signature
  }

  async mint(mintLootboxInput: MintLootboxInput) {
    const { walletAddress, batchID, amount } = mintLootboxInput
    LoggerService.log(`sign mint data for ${walletAddress},${batchID},${amount}`)

    const order = {
      to: walletAddress,
      batchID,
      amount,
      salt: randomSalt(),
      signature: "",
      type: MintType.Lootbox,
      status: MintStatus.Pending,
    }
    const signature = await signOrder(this.config, order)
    order.signature = signature
    const pendingMint = this.PendingMintRepo.create(order)
    LoggerService.log("save pending mint to ", walletAddress)
    await this.PendingMintRepo.save(pendingMint)

    const verifySignature = recoverOrderSignature(order, signature, this.config)
    if (!verifySignature) throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST)
    return signature
  }
}
