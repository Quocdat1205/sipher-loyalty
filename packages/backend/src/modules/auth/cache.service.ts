import { Cache } from "cache-manager";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";

import { UserData } from "./auth.types";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  get = async (token: string) => this.cacheManager.get<UserData>(token);

  set = async (token: string, userData: UserData) =>
    this.cacheManager.set<UserData>(token, userData, { ttl: 3600 });

  setBlockingLootbox = async (id: string, blocking: boolean) =>
    this.cacheManager.set<boolean>(`blocking_lootbox_${id}`, blocking, {
      ttl: 30,
    });

  getBlockingLootbox = async (id: string) => {
    const result = this.cacheManager.get<boolean>(id);
    if (result) return result;
    return false;
  };
}
