import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Airdrop, AirdropType } from "../../entity/airdrop.entity";

@Injectable()
export class AirdropService {
  constructor(
    @InjectRepository(Airdrop) private airdropRepos: Repository<Airdrop>
  ) {}

  async getAllAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.findOne({
      where: [
        { claimer: publicAddress },
        { claimer: publicAddress.toLowerCase() },
      ],
    });
    return data;
  }

  async getTokenAirdrop(publicAddress: string) {
    const data = await this.airdropRepos.findOne({
      where: [
        { claimer: publicAddress, type: AirdropType.TOKEN },
        { claimer: publicAddress.toLowerCase(), type: AirdropType.TOKEN },
      ],
    });
    return data;
  }
}
