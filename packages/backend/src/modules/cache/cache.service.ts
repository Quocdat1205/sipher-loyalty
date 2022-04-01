import { Cache } from "cache-manager";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";

import { UserData } from "@modules/auth/auth.types";
import { LoggerService } from "@modules/logger/logger.service";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  get = async (token: string) => {
    console.log(token);
    try {
      const result = await this.cacheManager.get<UserData>(token);
      console.log(result);
      return result;
    } catch (err) {
      console.log("get", err);
    }
  };

  set = async (token: string, userData: UserData) => {
    console.log(token, userData);
    try {
      await this.cacheManager.set<UserData>(token, userData, { ttl: 3600 });
    } catch (error) {
      console.log(error);
    }
  };

  setBlockingLootbox = async (id: number, blocking: boolean) => {
    if (id) {
      this.cacheManager.set<boolean>(`blocking_lootbox_${id}`, blocking, {
        ttl: 30,
      });
    }
  };

  getBlockingLootbox = async (id: number) => {
    const result = this.cacheManager.get<boolean>(id);
    if (result) return result;
    return false;
  };
}
