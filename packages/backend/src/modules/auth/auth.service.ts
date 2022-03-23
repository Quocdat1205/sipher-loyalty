import { Cache } from "cache-manager";
import { toChecksumAddress } from "ethereumjs-util";
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import constant from "@setting/constant";

import { UserData } from "./auth.types";

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  get = async (token: string) => this.cacheManager.get<UserData>(token);

  set = async (token: string, userData: UserData) =>
    this.cacheManager.set<UserData>(token, userData, { ttl: 3600 });

  verifyAddress = async (publicAddress: string, userData: UserData) => {
    if (
      userData.publicAddress.findIndex(
        (wAddress) => wAddress === toChecksumAddress(publicAddress)
      ) === -1
    )
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    else userData.currentpublicAddress = publicAddress;
    return userData;
  };
}
