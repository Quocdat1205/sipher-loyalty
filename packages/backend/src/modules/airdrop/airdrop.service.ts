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
    const token = await this.getTokenAirdrop(publicAddress);
    const nft = await this.getNFTAirdrop(publicAddress);
    const merch = await this.merchService.getAllMerchByPublicAddress(
      publicAddress
    );
    return { token, nft, merch };
  }

  private async getTokenAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.find({
      where: [
        { claimer: publicAddress, type: AirdropType.TOKEN },
        { claimer: publicAddress.toLowerCase(), type: AirdropType.TOKEN },
      ],
    });
    return data;
  }

  private async getMerchAirdrop(publicAddress: string) {
    return this.merchService.getAllMerchByPublicAddress(publicAddress);
  }

  private async getNFTAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.find({
      where: [
        { claimer: publicAddress, type: AirdropType.NFT },
        { claimer: publicAddress.toLowerCase(), type: AirdropType.NFT },
      ],
    });
    return data;
  }

  async getAirdropByType(publicAddress: string, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getTokenAirdrop(publicAddress);

      case AirdropType.NFT:
        return this.getNFTAirdrop(publicAddress);

      case AirdropType.MERCH:
        return this.getMerchAirdrop(publicAddress);

      default:
        return this.getAllAirdrop(publicAddress);
    }
  }
}
