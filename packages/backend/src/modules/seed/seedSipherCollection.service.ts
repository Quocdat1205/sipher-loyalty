// import library
import fs from "fs";
import path from "path";

import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { SipherCollection } from "src/entity/sipher-collection.entity";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedSipherCollectionService {
  private src = path.resolve(__dirname, "../../../src/data");

  private dataCollection = JSON.parse(
    fs
      .readFileSync(
        `${this.src}/COLLECTION/data${
          constant.isProduction ? "" : "_test.json"
        }`
      )
      .toString()
  );

  constructor(
    @InjectRepository(SipherCollection)
    private sipherCollectionRepo: Repository<SipherCollection>
  ) {}

  private seedCollection = async (collection) => {
    try {
      collection.id = collection.id.toLowerCase();
      const _collection = this.sipherCollectionRepo.create(collection);
      await this.sipherCollectionRepo.save(_collection);
    } catch (err) {
      LoggerService.error(JSON.stringify(err));
    }
  };

  seedCollections = async () => {
    await this.sipherCollectionRepo.query(`delete from sipher_collection`);

    const promises = [];
    for (let i = 0; i < this.dataCollection.length; i++) {
      promises.push(this.seedCollection(this.dataCollection[i]));
    }
    await Promise.all(promises);
    LoggerService.log("Done Sipher collection");
  };
}
