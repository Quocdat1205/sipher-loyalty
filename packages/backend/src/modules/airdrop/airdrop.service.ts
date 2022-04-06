import { In, Repository } from "typeorm";
import { ImageUrl } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserData } from "@modules/auth/auth.types";
import { LoggerService } from "@modules/logger/logger.service";
import { MerchService } from "@modules/merch/merch.service";
import { currency, weiToEther } from "@utils/utils";

import { Airdrop, AirdropType } from "../../entity/airdrop.entity";

import { ResAirdrop } from "./airdrop.type";

@Injectable()
export class AirdropService {
  constructor(
    @InjectRepository(Airdrop) private airdropRepo: Repository<Airdrop>,
    @InjectRepository(ImageUrl) private imageUrlRepo: Repository<ImageUrl>,
    private merchService: MerchService
  ) {}

  private async getAllAirdrops(publicAddress: string) {
    const token = await this.getTokenAirdrops(publicAddress);
    const nft = await this.getNFTAirdrops(publicAddress);
    const merchandise = await this.getMerchAirdrops(publicAddress);
    const other = await this.getOtherAirdrops(publicAddress);
    return { token, nft, merchandise, other };
  }

  private async getAllAirdropsByUserId(userData: UserData) {
    const token = await this.getTokenAirdropsByUserID(userData);
    const nft = await this.getNFTAirdropsByUserId(userData);
    const merchandise = await this.getMerchAirdropsByUserId(userData);
    const other = await this.getOtherAirdropsByUserId(userData);
    return { token, nft, merchandise, other };
  }

  async getDataAirdropTableForAdmin(from: number, take: number) {
    const data = await this.airdropRepo.find({
      relations: ["imageUrls"],
      skip: from,
      take,
    });
    return { total: data.length, data };
  }

  private async getTokenAirdrops(
    publicAddress: string
  ): Promise<Array<ResAirdrop>> {
    const data = await this.airdropRepo.find({
      where: [
        {
          claimer: publicAddress.toLowerCase(),
          type: AirdropType.TOKEN,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  private async getTokenAirdropsByUserID(
    userData: UserData
  ): Promise<Array<ResAirdrop>> {
    const data = await this.airdropRepo.find({
      where: [
        {
          claimer: In(userData.publicAddress),
          type: AirdropType.TOKEN,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  private async getMerchAirdrops(
    publicAddress: string
  ): Promise<Array<ResAirdrop>> {
    const merchandises = await this.merchService.getAllMerchByPublicAddress(
      publicAddress.toLowerCase()
    );
    return merchandises.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      shortDescription: merch.item.shortDescription,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      quantity: merch.quantity,
      type: merch.item.type,
    }));
  }

  private async getMerchAirdropsByUserId(
    userData: UserData
  ): Promise<Array<ResAirdrop>> {
    const merchandises = await this.merchService.getAllMerchByUserId(userData);
    return merchandises.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      shortDescription: merch.item.shortDescription,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      quantity: merch.quantity,
      type: merch.item.type,
    }));
  }

  private async getDetailTokenNFTAirdrop(id: string): Promise<ResAirdrop> {
    const data = await this.airdropRepo.findOne({
      where: { id },
      relations: ["imageUrls"],
    });
    // imgurl with airdrop will be many to many => will update at phase 2
    data.imageUrls = [
      {
        color: "black",
        default:
          "https://sipherstorage.s3.ap-southeast-1.amazonaws.com/loyalty/airdrop/sipher_token.png",
      },
    ];

    return data;
  }

  private async getDetailMerchAirdrop(id: string): Promise<ResAirdrop> {
    const merch = await this.merchService.getOtherAndMerchById(id);
    return {
      id: merch.id,
      name: merch.item.name,
      shortDescription: merch.item.shortDescription,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
      size: merch.item.size,
      color: merch.item.color,
      quantity: merch.quantity,
    };
  }

  private async getDetailMerchAirdropByUserId(
    id: string,
    userData: UserData
  ): Promise<ResAirdrop> {
    const merch = await this.merchService.getOtherAndMerchByIdAndUserId(
      id,
      userData
    );
    return {
      id: merch.id,
      name: merch.item.name,
      shortDescription: merch.item.shortDescription,
      description: merch.item.description,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
      size: merch.item.size,
      color: merch.item.color,
      quantity: merch.quantity,
    };
  }

  private async getOtherAirdrops(publicAddress: string) {
    const others = await this.merchService.getOtherMerchByPublicAddress(
      publicAddress.toLowerCase()
    );

    return others.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      shortDescription: merch.item.shortDescription,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
      quantity: merch.quantity,
    }));
  }

  private async getOtherAirdropsByUserId(userData: UserData) {
    const others = await this.merchService.getOtherMerchByUserId(userData);

    return others.map((merch) => ({
      id: merch.id,
      name: merch.item.name,
      description: merch.item.description,
      shortDescription: merch.item.shortDescription,
      imageUrls: merch.item.imageUrls,
      type: merch.item.type,
      quantity: merch.quantity,
    }));
  }

  private async getNFTAirdrops(publicAddress: string) {
    const data = await this.airdropRepo.find({
      where: [
        {
          claimer: publicAddress.toLowerCase(),
          type: AirdropType.NFT,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  private async getNFTAirdropsByUserId(userData: UserData) {
    const data = await this.airdropRepo.find({
      where: [
        {
          claimer: In(userData.publicAddress),
          type: AirdropType.NFT,
        },
      ],
      relations: ["imageUrls"],
    });
    return data;
  }

  async getAirdropsByType(publicAddress: string, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getTokenAirdrops(publicAddress);

      case AirdropType.NFT:
        return this.getNFTAirdrops(publicAddress);

      case AirdropType.MERCH:
        return this.getMerchAirdrops(publicAddress);

      case AirdropType.OTHER:
        return this.getOtherAirdrops(publicAddress);

      default:
        return this.getAllAirdrops(publicAddress);
    }
  }

  async getAirdropsByTypeAndUserId(userData: UserData, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getTokenAirdropsByUserID(userData);

      case AirdropType.NFT:
        return this.getNFTAirdropsByUserId(userData);

      case AirdropType.MERCH:
        return this.getMerchAirdropsByUserId(userData);

      case AirdropType.OTHER:
        return this.getOtherAirdropsByUserId(userData);

      default:
        return this.getAllAirdropsByUserId(userData);
    }
  }

  async getDetailAirdropByType(id: string, type: AirdropType) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getDetailTokenNFTAirdrop(id);

      case AirdropType.NFT:
        return this.getDetailTokenNFTAirdrop(id);

      case AirdropType.MERCH:
        return this.getDetailMerchAirdrop(id);

      case AirdropType.OTHER:
        return this.getDetailMerchAirdrop(id);

      default:
        return null;
    }
  }

  async getDetailAirdropByTypeAndUserId(
    id: string,
    userData: UserData,
    type: AirdropType
  ) {
    switch (type) {
      case AirdropType.TOKEN:
        return this.getDetailTokenNFTAirdrop(id);

      case AirdropType.NFT:
        return this.getDetailTokenNFTAirdrop(id);

      case AirdropType.MERCH:
        return this.getDetailMerchAirdropByUserId(id, userData);

      case AirdropType.OTHER:
        return this.getDetailMerchAirdropByUserId(id, userData);

      default:
        return null;
    }
  }

  private addAirdropToken = async (
    token: Airdrop,
    imageUrls: Array<ImageUrl>
  ) => {
    try {
      token.imageUrls = imageUrls;
      token.claimer = token.claimer.toLowerCase();
      const _token = this.airdropRepo.create(token);
      return this.airdropRepo.save(_token);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  private getImageUrlsToken = async () => {
    try {
      const imagesUrls = this.imageUrlRepo.find({
        relations: ["item"],
        where: {
          item: {
            type: AirdropType.TOKEN,
          },
        },
      });
      return imagesUrls;
    } catch (err) {
      LoggerService.error(err);
      return [];
    }
  };

  updateAirdropTokens = async (inputTokenData) => {
    try {
      const tokenData = inputTokenData.data.map((el) => ({
        merkleRoot: inputTokenData.merkleRoot,
        imageUrls: inputTokenData.imageUrls,
        ...el,
        addressContract: inputTokenData.addressContract.toLowerCase(),
        startTime: inputTokenData.startTime,
        vestingInterval: inputTokenData.vestingInterval,
        numberOfVestingPoint: inputTokenData.numberOfVestingPoint,
        name: inputTokenData.name,
        shortDescription: inputTokenData.shortDescription,
        description: [
          `${currency(weiToEther(el.totalAmount))} $SIPHER Token(s) Airdrop`,
          `Over a ${
            inputTokenData.numberOfVestingPoint
          } month Vesting Period with each month getting ${currency(
            weiToEther(el.totalAmount) / inputTokenData.numberOfVestingPoint
          )} $SIPHER starting on March 01 2022.`,
          `Please come back for your first Vested Airdrop of ${currency(
            weiToEther(el.totalAmount) / inputTokenData.numberOfVestingPoint
          )} $SIPHER on March 01 2022 `,
        ],
        type: AirdropType.TOKEN,
      }));

      const oldAirdropToken = await this.airdropRepo.find({
        addressContract: inputTokenData.addressContract,
      });
      await this.airdropRepo.remove(oldAirdropToken);

      const imageUrls = await this.getImageUrlsToken();
      const promises = [];
      for (let i = 0; i < tokenData.length; i++) {
        promises.push(this.addAirdropToken(tokenData[i], imageUrls));
      }
      const result = Promise.all(promises);

      LoggerService.log("Done update token merkle");
      return result;
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  };

  async updateDataAirdropTableForAdmin(airdrop: Airdrop) {
    return this.airdropRepo.save(airdrop);
  }
}
