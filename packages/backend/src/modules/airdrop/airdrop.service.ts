import { toChecksumAddress } from "ethereumjs-util";
import { In, Repository } from "typeorm";
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
    const merchandise = await this.getMerchAirdrop(publicAddress);
    const other = await this.getOtherAirdrop(publicAddress);
    return { token, nft, merchandise, other };
  }

  private async getTokenAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.find({
      where: [
        {
          claimer: In([
            publicAddress.toLowerCase(),
            toChecksumAddress(publicAddress),
          ]),
          type: AirdropType.TOKEN,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  private async getMerchAirdrop(
    publicAddress: string
  ): Promise<Array<Airdrop>> {
    const merchandises = await this.merchService.getAllMerchByPublicAddress(
      publicAddress
    );
    return merchandises.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
    }));
  }

  private async getOtherAirdrop(publicAddress: string) {
    const others = await this.merchService.getOtherMerchByPublicAddress(
      publicAddress
    );

    return others.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
    }));
  }

  private async getNFTAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.find({
      where: [
        {
          claimer: In([
            publicAddress.toLowerCase(),
            toChecksumAddress(publicAddress),
          ]),
          type: AirdropType.NFT,
        },
      ],
      relations: ["imageUrls"],
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

      case AirdropType.OTHER:
        return this.getOtherAirdrop(publicAddress);

      default:
        return this.getAllAirdrop(publicAddress);
    }
  }
}
