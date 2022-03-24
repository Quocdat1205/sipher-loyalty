// import library
import fs from "fs";
import path from "path";

import { Repository } from "typeorm";
import { ERC1155Sculpture, ERC1155SculptureAttribute } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedERC1155SculptureService {
  private src = path.resolve(
    __dirname,
    "../../../src/data/ERC1155/SCULPTURE/data.json"
  );

  private erc1155Data = JSON.parse(fs.readFileSync(this.src).toString());

  constructor(
    @InjectRepository(ERC1155Sculpture)
    private erc1155SculptureRepo: Repository<ERC1155Sculpture>,
    @InjectRepository(ERC1155SculptureAttribute)
    private erc1155SculptureAttributeRepo: Repository<ERC1155SculptureAttribute>
  ) {}

  private seedERC1155Sculpture = async (erc1155) => {
    try {
      const attributes = await this.seedERC1155SculptureAttributes(
        erc1155.attributes
      );
      erc1155.attributes = attributes;
      const erc1155Sculpture = this.erc1155SculptureRepo.create(erc1155);
      await this.erc1155SculptureRepo.save(erc1155Sculpture);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  private seedERC1155SculptureAttribute = async (attribute) => {
    try {
      const erc1155SculptureAttribute =
        this.erc1155SculptureAttributeRepo.create(attribute);
      const result = await this.erc1155SculptureAttributeRepo.save(
        erc1155SculptureAttribute
      );
      return result;
    } catch (err) {
      LoggerService.error(err);
      return {};
    }
  };

  private seedERC1155SculptureAttributes = async (attributes) => {
    const promises = [];
    for (let i = 0; i < attributes.length; i++) {
      promises.push(this.seedERC1155SculptureAttribute(attributes[i]));
    }
    return Promise.all(promises);
  };

  seedERC1155Sculptures = async () => {
    await this.erc1155SculptureRepo.query(
      `delete from erc1155_sculpture_attribute`
    );
    await this.erc1155SculptureRepo.query(`delete from erc1155_sculpture`);
    const promises = [];
    for (let i = 0; i < this.erc1155Data.length; i++) {
      promises.push(this.seedERC1155Sculpture(this.erc1155Data[i]));
    }
    await Promise.all(promises);
    LoggerService.log("Done");
  };
}
