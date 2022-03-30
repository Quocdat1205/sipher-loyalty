import { Repository } from "typeorm";
import { Airdrop, ImageUrl, Item } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UpdateImageUrlDto, UpdateItemDto } from "./admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(ImageUrl) private imageUrlRepo: Repository<ImageUrl>,
    @InjectRepository(Airdrop) private airDropRepo: Repository<Airdrop>
  ) {}

  async updateItemById(itemId: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepo.findOne(itemId);
    if (!item) {
      throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
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
