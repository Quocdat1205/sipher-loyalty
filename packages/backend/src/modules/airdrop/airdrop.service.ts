import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Airdrop } from "../../entity/airdrop.entity";

@Injectable()
export class AirdropService {
  constructor(
    @InjectRepository(Airdrop) private airdropRepos: Repository<Airdrop>
  ) {}

  async getAirdrop(publicAddress: string, campaignCode: string) {
    const data = await this.airdropRepos.findOne({
      where: [
        { claimer: publicAddress, campaignCode },
        { claimer: publicAddress.toLowerCase(), campaignCode },
      ],
    });
    return data;
  }
}
