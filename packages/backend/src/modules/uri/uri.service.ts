import { Repository } from "typeorm"
import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute } from "@entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class URIService {
  constructor(
    @InjectRepository(ERC1155SpaceShipPartLootbox)
    private ERC1155SpaceShipPartLootboxRepo: Repository<ERC1155SpaceShipPartLootbox>,
    @InjectRepository(ERC1155SpaceShipPartLootboxAttribute)
    private ERC1155SpaceShipPartLootboxAttributeRepo: Repository<ERC1155SpaceShipPartLootboxAttribute>,
  ) {}

  async getData(tokenId: number) {
    return this.ERC1155SpaceShipPartLootboxRepo.findOne({
      where: [{ tokenId }],
      relations: ["attributes"],
    })
  }
}
