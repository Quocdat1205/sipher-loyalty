import { Cache } from "cache-manager";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";

import { UserData } from "./auth.types";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  get = async (token: string) => this.cacheManager.get<UserData>(token);

  set = async (token: string, userData: UserData) =>
    this.cacheManager.set<UserData>(token, userData, { ttl: 3600 });

  setMintPending = async (publicAddress: string, minting: boolean) =>
    this.cacheManager.set<boolean>(publicAddress.toLowerCase(), minting, {
      ttl: 10,
    });

  getMintPending = async (publicAddress: string) => {
    if (this.cacheManager.get<boolean>(publicAddress.toLowerCase()))
      return this.cacheManager.get<boolean>(publicAddress.toLowerCase());
    return false;
  };
}
