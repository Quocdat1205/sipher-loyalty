import { In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MerchService } from "@modules/merch/merch.service";

import { Airdrop, AirdropType } from "../../entity/airdrop.entity";

import { ResAirdrop } from "./airdrop.type";

@Injectable()
export class AirdropService {
  constructor(
    @InjectRepository(Airdrop) private airdropRepos: Repository<Airdrop>,
    private merchService: MerchService
  ) {}

  private async getAllAirdrops(publicAddress: string) {
    const token = await this.getTokenAirdrops(publicAddress);
    const nft = await this.getNFTAirdrops(publicAddress);
    const merchandise = await this.getMerchAirdrops(publicAddress);
    const other = await this.getOtherAirdrops(publicAddress);
    return { token, nft, merchandise, other };
  }

  private async getTokenAirdrops(
    publicAddress: string
  ): Promise<Array<ResAirdrop>> {
    const data = await this.airdropRepos.find({
      where: [
        {
          claimer: publicAddress.toLowerCase(),
          type: AirdropType.TOKEN,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  private async getMerchAirdrops(
    publicAddress: string
  ): Promise<Array<ResAirdrop>> {
    const merchandises = await this.merchService.getAllMerchByPublicAddress(
      publicAddress.toLowerCase()
    );
    return merchandises.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
    }));
  }

  private async getTokenNFTAirdrop(id: string): Promise<ResAirdrop> {
    const data = await this.airdropRepos.findOne({
      where: { id },
      relations: ["imageUrls"],
    });
    return data;
  }

  private async getMerchAirdrop(id: string): Promise<ResAirdrop> {
    const merch = await this.merchService.getOtherAndMerchById(id);
    return {
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
      size: merch.item.size,
      color: merch.item.color,
    };
  }

  private async getOtherAirdrops(publicAddress: string) {
    const others = await this.merchService.getOtherMerchByPublicAddress(
      publicAddress.toLowerCase()
    );

    return others.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
    }));
  }

  private async getNFTAirdrops(publicAddress: string) {
    const data = await this.airdropRepos.find({
      where: [
        {
          claimer: publicAddress.toLowerCase(),
          type: AirdropType.NFT,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  async getAirdropsByType(publicAddress: string, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getTokenAirdrops(publicAddress);

      case AirdropType.NFT:
        return this.getNFTAirdrops(publicAddress);

      case AirdropType.MERCH:
        return this.getMerchAirdrops(publicAddress);

      case AirdropType.OTHER:
        return this.getOtherAirdrops(publicAddress);

      default:
        return this.getAllAirdrops(publicAddress);
    }
  }

  async getAirdropByType(id: string, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getTokenNFTAirdrop(id);

      case AirdropType.NFT:
        return this.getTokenNFTAirdrop(id);

      case AirdropType.MERCH:
        return this.getMerchAirdrop(id);

      case AirdropType.OTHER:
        return this.getMerchAirdrop(id);

      default:
        return null;
    }
  }
}
