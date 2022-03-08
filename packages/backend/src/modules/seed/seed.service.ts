// import library
import fs from "fs"

import { Repository } from "typeorm"
import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute } from "@entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

// import module
import { LoggerService } from "../logger/logger.service"

@Injectable()
export class SeedService {
  private erc1155Data = JSON.parse(fs.readFileSync("./src/data/ERC1155/data.json").toString())

  constructor(
    @InjectRepository(ERC1155SpaceShipPartLootbox)
    private erc1155SpaceShipPartLootboxRepo: Repository<ERC1155SpaceShipPartLootbox>,
    @InjectRepository(ERC1155SpaceShipPartLootboxAttribute)
    private ERC1155SpaceShipPartLootboxAttributeRepo: Repository<ERC1155SpaceShipPartLootboxAttribute>,
  ) {}

  private seedERC1155SpaceShipPartLootbox = async erc1155 => {
    try {
      const attributes = await this.seedERC1155SpaceShipPartLootboxAttributes(erc1155.attributes)
      erc1155.attributes = attributes
      const erc1155SpaceShipPartLootbox = this.erc1155SpaceShipPartLootboxRepo.create(erc1155)
      await this.erc1155SpaceShipPartLootboxRepo.save(erc1155SpaceShipPartLootbox)
    } catch (err) {
      LoggerService.log(err)
    }
  }

  private seedERC1155SpaceShipPartLootboxAttribute = async attribute => {
    try {
      const erc1155SpaceShipPartLootboxAttribute = this.ERC1155SpaceShipPartLootboxAttributeRepo.create(attribute)
      const result = await this.ERC1155SpaceShipPartLootboxAttributeRepo.save(erc1155SpaceShipPartLootboxAttribute)
      return result
    } catch (err) {
      LoggerService.log(err)
      return {}
    }
  }

  private seedERC1155SpaceShipPartLootboxAttributes = async attributes => {
    const promises = []
    for (let i = 0; i < attributes.length; i++) {
      promises.push(this.seedERC1155SpaceShipPartLootboxAttribute(attributes[i]))
    }
    return Promise.all(promises)
  }

  seedERC1155SpaceShipPartLootboxs = async () => {
    await this.erc1155SpaceShipPartLootboxRepo.query(`delete from erc1155_space_ship_part_lootbox_attribute`)
    await this.erc1155SpaceShipPartLootboxRepo.query(`delete from erc1155_space_ship_part_lootbox`)
    const promises = []
    for (let i = 0; i < this.erc1155Data.length; i++) {
      promises.push(this.seedERC1155SpaceShipPartLootbox(this.erc1155Data[i]))
    }
    await Promise.all(promises)
    LoggerService.log("Done")
  }
}
