// import library
import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
// import module
import { LoggerService } from '../logger/logger.service';
import { NftContract } from '../contract/contract.module';
import constant from '@setting/constant';
import { Lootbox } from '@entity';

@Injectable()
export class LootBoxService {
  private INU_ABI = JSON.parse(
    fs.readFileSync('./src/data/INU/abi.json').toString(),
  );
  private NEKO_ABI = JSON.parse(
    fs.readFileSync('./src/data/NEKO/abi.json').toString(),
  );
  private InuContract = new NftContract({
    abi: this.NEKO_ABI,
    contract: constant.SC_NFT_INU,
  });
  private NekoContract = new NftContract({
    abi: this.INU_ABI,
    contract: constant.SC_NFT_NEKO,
  });
  constructor(
    @InjectRepository(Lootbox) private LootboxRepo: Repository<Lootbox>,
  ) {}

  @Cron('0 0 0 * * 0')
  async handleCron() {
    LoggerService.log('check balance holder Sipher nft');
    await this.distributeLootboxWeeklyForHolder();
    LoggerService.log('distribute lootbox');
  }

  private distributeLootbox = async (
    nftContract: NftContract,
    i: number,
    typeId: number,
  ) => {
    try {
      const publicAddress: string = await nftContract.getOwnerOf(i);
      let lootbox = await this.LootboxRepo.findOne({
        where: { publicAddress, typeId },
      });
      if (!lootbox) {
        lootbox = await this.LootboxRepo.create({
          publicAddress,
          typeId,
          quantity: 1,
        });
      } else {
        lootbox.quantity++;
      }
      await this.LootboxRepo.save(lootbox);
    } catch (err) {
      console.log('err at ', i);
    }
  };

  private distributeLootboxForContract = async (
    nftContract: NftContract,
    typeId: number,
  ) => {
    const promises = [];

    for (let i = 1; i <= 10000; i++) {
      promises.push(this.distributeLootbox(nftContract, i, typeId));
    }
    await Promise.all(promises);
  };

  distributeLootboxWeeklyForHolder = async () => {
    const typeId = Math.floor(new Date().getTime() / 86400) % 7;
    await this.distributeLootboxForContract(this.InuContract, typeId);
    await this.distributeLootboxForContract(this.NekoContract, typeId);
  };

  getLootboxFromWallet = async (publicAddress: string) => {
    const lootboxs = await this.LootboxRepo.find({
      where: [
        { publicAddress },
        { publicAddress: publicAddress.toLowerCase() },
      ],
    });
    return lootboxs;
  };

  getLootboxFromUserID = async (userID: string) => {
    const lootboxs = await this.LootboxRepo.find({
      where: { user: { userID } },
    });
    return lootboxs;
  };
}
