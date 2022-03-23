import { Repository } from "typeorm";
import {
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
} from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class URIService {
  constructor(
    @InjectRepository(ERC1155Lootbox)
    private ERC1155LootboxRepo: Repository<ERC1155Lootbox>,
    @InjectRepository(ERC1155LootboxAttribute)
    private ERC1155LootboxAttributeRepo: Repository<ERC1155LootboxAttribute>,
    @InjectRepository(ERC1155Sculpture)
    private ERC1155SculptureRepo: Repository<ERC1155Sculpture>,
    @InjectRepository(ERC1155SculptureAttribute)
    private ERC1155SculptureAttributeRepo: Repository<ERC1155SculptureAttribute>
  ) {}

  async getDataERC1155Spaceship(tokenId: number) {
    return this.ERC1155LootboxRepo.findOne({
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
