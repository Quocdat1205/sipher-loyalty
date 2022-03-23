import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MerchService } from "@modules/merch/merch.service";

import { Airdrop, AirdropType } from "../../entity/airdrop.entity";

@Injectable()
export class AirdropService {
  constructor(
    @InjectRepository(Airdrop) private airdropRepos: Repository<Airdrop>,
    private merchService: MerchService
  ) {}

  private async getAllAirdrop(publicAddress: string) {
    const token = await this.getAirdropByType(publicAddress, AirdropType.TOKEN);
    const nft = await this.getAirdropByType(publicAddress, AirdropType.NFT);
    const merch = await this.getAirdropByType(publicAddress, AirdropType.MERCH);
    return { token, nft, merch };
  }

  private async getTokenAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.findOne({
      where: [
        { claimer: publicAddress, type: AirdropType.TOKEN },
        { claimer: publicAddress.toLowerCase(), type: AirdropType.TOKEN },
      ],
    });
    return data;
  }

  async getAirdropByType(publicAddress: string, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getTokenAirdrop(publicAddress);
        break;

      case AirdropType.MERCH:
        this.merchService.getAllMerch(publicAddress);
        break;

      default:
        return this.getAllAirdrop(publicAddress);
        break;
    }
  }
}
