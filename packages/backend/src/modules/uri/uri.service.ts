import { Repository } from "typeorm";
import {
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ERC1155SpaceShipPartLootbox,
  ERC1155SpaceShipPartLootboxAttribute,
} from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class URIService {
  constructor(
    @InjectRepository(ERC1155SpaceShipPartLootbox)
    private ERC1155SpaceShipPartLootboxRepo: Repository<ERC1155SpaceShipPartLootbox>,
    @InjectRepository(ERC1155SpaceShipPartLootboxAttribute)
    private ERC1155SpaceShipPartLootboxAttributeRepo: Repository<ERC1155SpaceShipPartLootboxAttribute>,
    @InjectRepository(ERC1155Sculpture)
    private ERC1155SculptureRepo: Repository<ERC1155Sculpture>,
    @InjectRepository(ERC1155SculptureAttribute)
    private ERC1155SculptureAttributeRepo: Repository<ERC1155SculptureAttribute>
  ) {}

  async getDataERC1155Spaceship(tokenId: number) {
    return this.ERC1155SpaceShipPartLootboxRepo.findOne({
      where: [{ tokenId }],
      relations: ["attributes"],
    });
  }

  async getDataERC1155Sculpture(tokenId: number) {
    return this.ERC1155SculptureRepo.findOne({
      where: [{ tokenId }],
      relations: ["attributes"],
    });
  }
}
