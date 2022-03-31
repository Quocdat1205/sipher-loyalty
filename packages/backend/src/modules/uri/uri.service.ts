import { Repository } from "typeorm";
import {
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
} from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "@modules/logger/logger.service";

@Injectable()
export class URIService {
  constructor(
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>,
    @InjectRepository(ERC1155LootboxAttribute)
    private erc1155LootboxAttributeRepo: Repository<ERC1155LootboxAttribute>,
    @InjectRepository(ERC1155Sculpture)
    private erc1155SculptureRepo: Repository<ERC1155Sculpture>,
    @InjectRepository(ERC1155SculptureAttribute)
    private erc1155SculptureAttributeRepo: Repository<ERC1155SculptureAttribute>
  ) {}

  async getDataERC1155Lootbox(tokenId: number) {
    return this.erc1155LootboxRepo.findOne({
      where: [{ tokenId }],
      relations: ["attributes"],
    });
  }

  async getDataERC1155Sculpture(tokenId: number) {
    return this.erc1155SculptureRepo.findOne({
      where: [{ tokenId }],
      relations: ["attributes"],
    });
  }

  addERC1155Lootbox = async (erc1155: ERC1155Lootbox) => {
    try {
      const _erc1155 = await this.erc1155LootboxRepo.findOne({
        tokenId: erc1155.tokenId,
      });
      if (_erc1155)
        throw new HttpException(
          `tokenId ${erc1155.tokenId} exist`,
          HttpStatus.BAD_REQUEST
        );

      const attributes = await this.addERC1155LootboxAttributes(
        erc1155.attributes
      );
      erc1155.attributes = attributes;
      return this.erc1155LootboxRepo.save(erc1155);
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException(
        `tokenId ${erc1155.tokenId} exist`,
        HttpStatus.BAD_REQUEST
      );
    }
  };

  updateERC1155Lootbox = async (erc1155: ERC1155Lootbox) => {
    try {
      const oldErc1155 = await this.getDataERC1155Lootbox(erc1155.tokenId);
      const oldAttributes = await this.erc1155LootboxAttributeRepo.find({
        relations: ["erc1155"],
        where: { erc1155: oldErc1155 },
      });
      await this.erc1155LootboxAttributeRepo.remove(oldAttributes);
      const attributes = await this.addERC1155LootboxAttributes(
        erc1155.attributes
      );
      erc1155.attributes = attributes;
      return this.erc1155LootboxRepo.save(erc1155);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  private addERC1155LootboxAttribute = async (
    attribute: ERC1155LootboxAttribute
  ) => {
    try {
      const erc1155LootboxAttribute =
        this.erc1155LootboxAttributeRepo.create(attribute);
      const result = await this.erc1155LootboxAttributeRepo.save(
        erc1155LootboxAttribute
      );
      return result;
    } catch (err) {
      LoggerService.error(err);
      return {};
    }
  };

  private addERC1155LootboxAttributes = async (
    attributes: Array<ERC1155LootboxAttribute>
  ) => {
    const promises = [];
    for (let i = 0; i < attributes.length; i++) {
      promises.push(this.addERC1155LootboxAttribute(attributes[i]));
    }
    return Promise.all(promises);
  };

  addERC1155Sculpture = async (erc1155: ERC1155Sculpture) => {
    try {
      const _erc1155 = await this.erc1155SculptureRepo.findOne({
        tokenId: erc1155.tokenId,
      });
      if (_erc1155)
        throw new HttpException(
          `tokenId ${erc1155.tokenId} exist`,
          HttpStatus.BAD_REQUEST
        );

      const attributes = await this.addERC1155SculptureAttributes(
        erc1155.attributes
      );
      erc1155.attributes = attributes;
      const erc1155Sculpture = this.erc1155SculptureRepo.create(erc1155);
      return this.erc1155SculptureRepo.save(erc1155Sculpture);
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException(
        `tokenId ${erc1155.tokenId} exist`,
        HttpStatus.BAD_REQUEST
      );
    }
  };

  updateERC1155Sculpture = async (erc1155: ERC1155Sculpture) => {
    try {
      const oldErc1155 = await this.getDataERC1155Sculpture(erc1155.tokenId);
      const oldAttributes = await this.erc1155SculptureAttributeRepo.find({
        relations: ["erc1155"],
        where: { erc1155: oldErc1155 },
      });
      await this.erc1155SculptureAttributeRepo.remove(oldAttributes);
      const attributes = await this.addERC1155SculptureAttributes(
        erc1155.attributes
      );
      erc1155.attributes = attributes;
      return this.erc1155SculptureRepo.save(erc1155);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  private addERC1155SculptureAttribute = async (
    attribute: ERC1155SculptureAttribute
  ) => {
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

  private addERC1155SculptureAttributes = async (
    attributes: Array<ERC1155SculptureAttribute>
  ) => {
    const promises = [];
    for (let i = 0; i < attributes.length; i++) {
      promises.push(this.addERC1155SculptureAttribute(attributes[i]));
    }
    return Promise.all(promises);
  };
}
