import { Repository } from "typeorm";
import {
  Airdrop,
  ClaimableLootbox,
  ERC1155Lootbox,
  ERC1155Sculpture,
  ImageUrl,
  Item,
  Lootbox,
} from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AirdropService } from "@modules/airdrop/airdrop.service";
import { BurnService } from "@modules/burn/burn.service";
import { CancelService } from "@modules/cancel/cancel.service";
import { CollectionService } from "@modules/collection/collection.service";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MerchService } from "@modules/merch/merch.service";
import { MintService } from "@modules/mint/mint.service";

import { UpdateImageUrlDto, UpdateItemDto } from "./admin.dto";
import { TableType } from "./admin.type";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(ImageUrl) private imageUrlRepo: Repository<ImageUrl>,
    @InjectRepository(Airdrop) private airDropRepo: Repository<Airdrop>,
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>,
    @InjectRepository(ERC1155Sculpture)
    private erc1155SculptureRepo: Repository<ERC1155Sculpture>,
    private merchService: MerchService,
    private airdropService: AirdropService,
    private pendingMintService: MintService,
    private cancelService: CancelService,
    private burnService: BurnService,
    private lootBoxService: LootBoxService,
    private collectionService: CollectionService
  ) {}

  private async getDataERC1155LootboxTableForAdmin(
    from: number,
    take: number
  ): Promise<Array<ERC1155Lootbox>> {
    const data = await this.erc1155LootboxRepo.find({
      relations: ["attributes"],
      skip: from,
      take,
    });
    return data;
  }

  private async getDataERC1155SculptureTableForAdmin(
    from: number,
    take: number
  ): Promise<Array<ERC1155Sculpture>> {
    const data = await this.erc1155SculptureRepo.find({
      relations: ["attributes"],
      skip: from,
      take,
    });
    return data;
  }

  async updateItemById(itemId: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepo.findOne(itemId);
    if (!item) {
      throw new HttpException("Item not found", HttpStatus.BAD_REQUEST);
    }
    item.color = updateItemDto.color;
    item.description = updateItemDto.description;
    item.merchItem = updateItemDto.merchItem;
    item.name = updateItemDto.name;
    item.size = updateItemDto.size;
    item.type = updateItemDto.type;
    item.shortDescription = updateItemDto.shortDescription;
    await this.itemRepo.save(item);
  }

  async getDataTableByType(from: number, to: number, type: TableType) {
    switch (type) {
      case TableType.AIRDROP:
        return this.airdropService.getDataAirdropTableForAdmin(from, to);

      case TableType.MERCH:
        return this.merchService.getDataMerchTableForAdmin(from, to);

      case TableType.MINT:
        return this.pendingMintService.getDataMintTableForAdmin(from, to);

      case TableType.BURN:
        return this.burnService.getDataBurnTableForAdmin(from, to);

      case TableType.CANCEL:
        return this.cancelService.getDataCancelTableForAdmin(from, to);

      case TableType.LOOTBOX:
        return this.lootBoxService.getDataLootboxTableForAdmin(from, to);

      case TableType.CLAIMABLELOOTBOX:
        return this.lootBoxService.getDataClaimableLootboxTableForAdmin(
          from,
          to
        );

      case TableType.COLLECTION:
        return this.collectionService.getDataCollectionTableForAdmin(from, to);

      case TableType.ERC1155LOOTBOX:
        return this.getDataERC1155LootboxTableForAdmin(from, to);

      case TableType.ERC1155SCULPTURE:
        return this.getDataERC1155SculptureTableForAdmin(from, to);

      default:
        throw new HttpException("invalid type", HttpStatus.BAD_REQUEST);
    }
  }

  async updateImageUrlById(
    imageUrlId: number,
    updateImageUrlDto: UpdateImageUrlDto
  ) {
    const imageUrl = await this.imageUrlRepo.findOne(imageUrlId);
    if (!imageUrl) {
      throw new HttpException("Image not found", HttpStatus.NOT_FOUND);
    }
    if (!updateImageUrlDto.airdropId !== undefined) {
      const airDrop = await this.airDropRepo.findOne(
        updateImageUrlDto.airdropId
      );
      if (!airDrop) {
        throw new HttpException("Airdrop not found", HttpStatus.NOT_FOUND);
      }
      imageUrl.airdrop = airDrop;
    }
    if (!updateImageUrlDto.itemId !== undefined) {
      const item = await this.itemRepo.findOne(updateImageUrlDto.itemId);
      if (!item) {
        throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
      }
      imageUrl.item = item;
    }
    imageUrl.back = updateImageUrlDto.back;
    imageUrl.top = updateImageUrlDto.top;
    imageUrl.bot = updateImageUrlDto.bot;
    imageUrl.left = updateImageUrlDto.left;
    imageUrl.right = updateImageUrlDto.right;
    imageUrl.front = updateImageUrlDto.front;
    imageUrl.default = updateImageUrlDto.default;
    imageUrl.color = updateImageUrlDto.color;

    await this.imageUrlRepo.save(imageUrl);
  }
}
