import { Repository } from "typeorm";
import { Airdrop, ImageUrl, Item } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AirdropService } from "@modules/airdrop/airdrop.service";
import { BurnService } from "@modules/burn/burn.service";
import { CancelService } from "@modules/cancel/cancel.service";
import { CollectionService } from "@modules/collection/collection.service";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MerchService } from "@modules/merch/merch.service";
import { MintService } from "@modules/mint/mint.service";
import { URIService } from "@modules/uri/uri.service";

import { UpdateImageUrlDto, UpdateItemDto } from "./admin.dto";
import { BodyAdminUpdate, TableType } from "./admin.type";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(ImageUrl) private imageUrlRepo: Repository<ImageUrl>,
    @InjectRepository(Airdrop) private airdropRepo: Repository<Airdrop>,
    private merchService: MerchService,
    private airdropService: AirdropService,
    private pendingMintService: MintService,
    private cancelService: CancelService,
    private burnService: BurnService,
    private lootBoxService: LootBoxService,
    private collectionService: CollectionService,
    private uriService: URIService
  ) {}

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

  async getDataTableByType(from: number, size: number, type: TableType) {
    switch (type) {
      case TableType.AIRDROP:
        return this.airdropService.getDataAirdropTableForAdmin(from, size);

      case TableType.MERCH:
        return this.merchService.getDataMerchTableForAdmin(from, size);

      case TableType.MINT:
        return this.pendingMintService.getDataMintTableForAdmin(from, size);

      case TableType.BURN:
        return this.burnService.getDataBurnTableForAdmin(from, size);

      case TableType.CANCEL:
        return this.cancelService.getDataCancelTableForAdmin(from, size);

      case TableType.LOOTBOX:
        return this.lootBoxService.getDataLootboxTableForAdmin(from, size);

      case TableType.CLAIMABLELOOTBOX:
        return this.lootBoxService.getDataClaimableLootboxTableForAdmin(
          from,
          size
        );

      case TableType.COLLECTION:
        return this.collectionService.getDataCollectionTableForAdmin(
          from,
          size
        );

      case TableType.ERC1155LOOTBOX:
        return this.uriService.getDataERC1155LootboxTableForAdmin(from, size);

      case TableType.ERC1155SCULPTURE:
        return this.uriService.getDataERC1155SculptureTableForAdmin(from, size);

      default:
        throw new HttpException("invalid type", HttpStatus.BAD_REQUEST);
    }
  }

  async updateDataTableByType(body: BodyAdminUpdate) {
    switch (body.type) {
      case TableType.AIRDROP:
        return this.airdropService.updateAirdropTokens(body.airdrop);

      case TableType.MERCH:
        return this.merchService.updateDataMerchTableForAdmin(body.merch);

      case TableType.MINT:
        return this.pendingMintService.updatePendingMint(body.mint);

      case TableType.BURN:
        return this.burnService.updateBurned(body.burn);

      case TableType.CANCEL:
        return this.cancelService.updateCanceled(body.cancel);

      case TableType.LOOTBOX:
        return this.lootBoxService.updateDataLootboxTableForAdmin(body.lootbox);

      case TableType.CLAIMABLELOOTBOX:
        return this.lootBoxService.updateDataClaimableLootboxTableForAdmin(
          body.claimableLootbox
        );
      case TableType.COLLECTION:
        return this.collectionService.updateDataCollectionTableForAdmin(
          body.collection
        );
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
      const airDrop = await this.airdropRepo.findOne(
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

  async updateImageUrlForToken(imageUrl: ImageUrl, addressContract: string) {
    const _imageUrl = this.imageUrlRepo.create(imageUrl);
    const result = await this.imageUrlRepo.save(_imageUrl);
    const tokens = await this.airdropRepo.find({ addressContract });
    const promises = [];
    for (let i = 0; i < tokens.length; i++) {
      tokens[i].imageUrls = [result];
      promises.push(this.airdropRepo.save(tokens[i]));
    }
    return Promise.all(promises);
  }
}
