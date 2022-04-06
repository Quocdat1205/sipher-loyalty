import { Cache } from "cache-manager";
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import { UserData } from "@modules/auth/auth.types";
import { LoggerService } from "@modules/logger/logger.service";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  get = async (token: string) => {
    if (!token)
      throw new HttpException("undefinded token", HttpStatus.UNAUTHORIZED);
    try {
      const result = await this.cacheManager.get<UserData>(token);
      return result;
    } catch (err) {
      LoggerService.error(err);
    }
  };

  set = async (token: string, userData: UserData) => {
    if (!token)
      throw new HttpException("undefinded token", HttpStatus.UNAUTHORIZED);
    try {
      await this.cacheManager.set<UserData>(token, userData, { ttl: 3600 });
    } catch (err) {
      LoggerService.error(err);
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
