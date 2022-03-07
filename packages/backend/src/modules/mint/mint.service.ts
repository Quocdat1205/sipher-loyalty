// import library
import { ethers } from "ethers"
import { Repository } from "typeorm"
import { PendingMint } from "@entity"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import constant from "@setting/constant"

import { MintLootboxInput } from "@modules/lootbox/lootbox.type"
import { recoverOrderSignature } from "@utils/recover"
import { signOrder } from "@utils/signer"

import { AuthService } from "../auth/auth.service"
import { LoggerService } from "../logger/logger.service"

@Injectable()
export class MintService {
  constructor(
    @InjectRepository(PendingMint) private PendingMintRepo: Repository<PendingMint>,
    private authService: AuthService,
  ) {}

  async test() {
    LoggerService.log(`sign mint data for 0x83629905189464CC16F5E7c12D54dD5e87459B33, id : 1 ,amount : 1`)

    const order = {
      to: "0x83629905189464CC16F5E7c12D54dD5e87459B33",
      batchID: 1,
      amount: 1,
      salt: "0x",
    }
    const config = {
      chainId: constant.CHAIN_ID,
      verifyingContract: "0x0171109010873789190f0A67d1Ca4854bEbf37D1",
    }
    const signature = await signOrder(config, order)

    const verifySignature = recoverOrderSignature(order, signature, config)
    if (!verifySignature) throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST)
    return signature
  }

  async mint(mintInput: MintLootboxInput) {
    const { walletAddress, batchID, amount } = mintInput
    LoggerService.log(`sign mint data for ${walletAddress},${batchID},${amount}`)

    const order = {
      to: walletAddress,
      batchID,
      amount,
      salt: ethers.utils.formatBytes32String((Math.random() * 100000000000000).toString()),
      signature: "",
    }

    const config = {
      chainId: constant.CHAIN_ID,
      verifyingContract: "0x0171109010873789190f0A67d1Ca4854bEbf37D1",
    }
    const signature = await signOrder(config, order)
    order.signature = signature
    const pendingMint = this.PendingMintRepo.create(order)
    LoggerService.log("save pending mint to ", walletAddress)
    await this.PendingMintRepo.save(pendingMint)

    const verifySignature = recoverOrderSignature(order, signature, config)
    if (!verifySignature) throw new HttpException("wrong signature", HttpStatus.BAD_REQUEST)
    return signature
  }
}
