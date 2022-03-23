// import library
import fs from "fs";

import { Repository } from "typeorm";
import { ERC1155Lootbox, ERC1155LootboxAttribute } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedERC1155SpaceshipService {
  private erc1155Data = JSON.parse(
    fs.readFileSync("./src/data/ERC1155/LOOTBOX/data.json").toString()
  );

  constructor(
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>,
    @InjectRepository(ERC1155LootboxAttribute)
    private ERC1155LootboxAttributeRepo: Repository<ERC1155LootboxAttribute>
  ) {}

  private seedERC1155Lootbox = async (erc1155) => {
    try {
      const attributes = await this.seedERC1155LootboxAttributes(
        erc1155.attributes
      );
      erc1155.attributes = attributes;
      const erc1155Lootbox = this.erc1155LootboxRepo.create(erc1155);
      await this.erc1155LootboxRepo.save(erc1155Lootbox);
    } catch (err) {
      LoggerService.log(err);
    }
  };

  private seedERC1155LootboxAttribute = async (attribute) => {
    try {
      const erc1155LootboxAttribute =
        this.ERC1155LootboxAttributeRepo.create(attribute);
      const result = await this.ERC1155LootboxAttributeRepo.save(
        erc1155LootboxAttribute
      );
      return result;
    } catch (err) {
      LoggerService.log(err);
      return {};
    }
  };

  private seedERC1155LootboxAttributes = async (attributes) => {
    const promises = [];
    for (let i = 0; i < attributes.length; i++) {
      promises.push(this.seedERC1155LootboxAttribute(attributes[i]));
    }
    return Promise.all(promises);
  };

  seedERC1155Lootboxs = async () => {
    await this.erc1155LootboxRepo.query(
      `delete from erc1155_space_ship_part_lootbox_attribute`
    );
    await this.erc1155LootboxRepo.query(
      `delete from erc1155_space_ship_part_lootbox`
    );
    const promises = [];
    for (let i = 0; i < this.erc1155Data.length; i++) {
      promises.push(this.seedERC1155Lootbox(this.erc1155Data[i]));
    }
    await Promise.all(promises);
    LoggerService.log("Done");
  };
}
