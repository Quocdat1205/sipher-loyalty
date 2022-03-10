// import library
import fs from "fs"

import { toChecksumAddress } from "ethereumjs-util"
import { Repository } from "typeorm"
import { Lootbox } from "@entity"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import constant from "@setting/constant"

import { MintService } from "@modules/mint/mint.service"

import { NftContract } from "../contract/contract.module"
import { LoggerService } from "../logger/logger.service"

import { MintBatchLootboxInput, MintLootboxInput } from "./lootbox.type"

@Injectable()
export class LootBoxService {
  private abiINU = JSON.parse(fs.readFileSync("./src/data/INU/abi.json").toString())

  private abiNEKO = JSON.parse(fs.readFileSync("./src/data/NEKO/abi.json").toString())

  private InuContract = new NftContract({
    abi: this.abiINU,
    contract: constant.SC_NFT_INU,
  })

  private NekoContract = new NftContract({
    abi: this.abiNEKO,
    contract: constant.SC_NFT_NEKO,
  })

  constructor(@InjectRepository(Lootbox) private LootboxRepo: Repository<Lootbox>, private mintService: MintService) {}

  @Cron("0 0 0 * * 0")
  async handleCron() {
    LoggerService.log("check balance holder Sipher nft and distribute")
    await this.distributeLootboxWeeklyForHolder()
    LoggerService.log("distribute lootbox finished! ")
  }

  private distributeLootbox = async (nftContract: NftContract, i: number, tokenId: number) => {
    try {
      const publicAddress: string = await nftContract.getOwnerOf(i)
      let lootbox = await this.LootboxRepo.findOne({
        where: { publicAddress, tokenId },
      })
      if (!lootbox) {
        lootbox = this.LootboxRepo.create({
          publicAddress,
          tokenId,
          quantity: 1,
        })
      } else {
        lootbox.quantity++
      }
      LoggerService.log("save lootbox to ", publicAddress)
      await this.LootboxRepo.save(lootbox)
    } catch (err) {
      LoggerService.log("err at ", i)
    }
  }

  private distributeLootboxForContract = async (nftContract: NftContract, typeId: number) => {
    const promises = []

    for (let i = 1; i <= 10000; i++) {
      promises.push(this.distributeLootbox(nftContract, i, typeId))
    }
    await Promise.all(promises)
  }

  distributeLootboxWeeklyForHolder = async () => {
    const typeId = Math.floor(new Date().getTime() / (86400 * 7)) % 7
    // await this.distributeLootboxForContract(this.InuContract, typeId)
    await this.distributeLootboxForContract(this.NekoContract, typeId)
  }

  getLootboxFromWallet = async (publicAddress: string) => {
    const lootboxs = await this.LootboxRepo.find({
      where: [{ publicAddress: toChecksumAddress(publicAddress) }, { publicAddress: publicAddress.toLowerCase() }],
    })
    return lootboxs
  }

  getLootboxFromWalletAndTokenID = async (publicAddress: string, tokenId: number) => {
    const lootboxs = await this.LootboxRepo.findOne({
      where: [
        { publicAddress: toChecksumAddress(publicAddress), tokenId },
        { publicAddress: publicAddress.toLowerCase(), tokenId },
      ],
    })
    return lootboxs
  }

  private getLootboxFromWalletAndTokenIDs = async (publicAddress: string, tokenId: number[]) => {
    const promises = []
    for (let i = 0; i < tokenId.length; i++) {
      promises.push(this.getLootboxFromWalletAndTokenID(publicAddress, tokenId[i]))
    }
    return Promise.all(promises)
  }

  private flattenLootbox = async lootboxs => {
    const flattern_lootbox = []
    lootboxs.forEach((lootbox: Lootbox) => {
      const index = flattern_lootbox.findIndex(
        (lb: Lootbox) => lb.publicAddress === lootbox.publicAddress && lb.tokenId === lootbox.tokenId,
      )
      if (index !== -1) flattern_lootbox[index].quantity += lootbox.quantity
      else flattern_lootbox.push(lootbox)
    })
    return flattern_lootbox
  }

  getLootboxFromUserID = async (userId: string) => {
    LoggerService.log("userId", userId)
    // get list wallet address from Sipher User ID
    const walletAddressList = [
      "0x83629905189464CC16F5E7c12D54dD5e87459B33",
      "0xE5B8CbFf1768E8559E0F002ac01fA5D070551b4D",
    ]
    const promises = []
    walletAddressList.forEach(walletAddress => {
      promises.push(this.getLootboxFromWallet(walletAddress))
    })
    const lootboxs = (await Promise.all(promises)).flat(1)

    return this.flattenLootbox(lootboxs)
  }

  mintBatchLootbox = async (mintBatchLootboxInput: MintBatchLootboxInput) => {
    const { walletAddress, batchID, amount } = mintBatchLootboxInput

    // verify
    if (batchID.length !== amount.length)
      throw new HttpException("batchID length and amount length not equal ", HttpStatus.BAD_REQUEST)

    if (batchID.filter((x, i, a) => a.indexOf(x) === i).length < batchID.length)
      throw new HttpException("duplicate batchID  ", HttpStatus.BAD_REQUEST)

    if (amount.findIndex(item => item === 0) !== -1)
      throw new HttpException("amount must not equal zero", HttpStatus.BAD_REQUEST)
    const promises = []
    const lootboxs = await this.getLootboxFromWalletAndTokenIDs(walletAddress, batchID)
    for (let i = 0; i < batchID.length; i++) {
      if (!lootboxs[i]) throw new HttpException("not have tokenID ", HttpStatus.BAD_REQUEST)
      if (lootboxs[i].quantity - lootboxs[i].pending < amount[i])
        throw new HttpException("not enough balance", HttpStatus.BAD_REQUEST)
      lootboxs[i].pending += amount[i]
    }

    // update batch lootbox
    for (let i = 0; i < lootboxs.length; i++) {
      promises.push(this.LootboxRepo.save(lootboxs[i]))
    }

    // sign messages and save pending mint
    const signanture = await this.mintService.mintBatch(mintBatchLootboxInput)

    // get pending mint
    const pending = await this.mintService.getPendingLootbox(walletAddress)

    const data = await Promise.all(promises)
    return { signanture, data, pending }
  }

  mintLootbox = async (mintLootboxInput: MintLootboxInput) => {
    const { walletAddress, batchID, amount } = mintLootboxInput

    // verify
    if (amount === 0) throw new HttpException("amount must not equal zero", HttpStatus.BAD_REQUEST)
    const lootbox = await this.getLootboxFromWalletAndTokenID(walletAddress, batchID)
    if (!lootbox) throw new HttpException("not have tokenID ", HttpStatus.BAD_REQUEST)
    if (lootbox.quantity - lootbox.pending < amount)
      throw new HttpException("not enough balance", HttpStatus.BAD_REQUEST)
    lootbox.pending += amount

    // update lootbox
    const data = await this.LootboxRepo.save(lootbox)

    // sign messages and save pending mint
    const signanture = await this.mintService.mint(mintLootboxInput)

    // get pending mint
    const pending = await this.mintService.getPendingLootbox(walletAddress)

    return { signanture, data, pending }
  }
}
