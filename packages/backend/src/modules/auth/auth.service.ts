// import { toChecksumAddress } from "ethereumjs-util";
// import { createClient } from "redis";
// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// import { UserData } from "./auth.types";

// @Injectable()
// export class AuthService {
//   private client;

//   constructor() {
//     this.client = createClient({
//       url: "redis://:stVd1QlSQfS5SSAbHyVec7AyI6A7sA5R@redis-15957.c61.us-east-1-3.ec2.cloud.redislabs.com:15957",
//     });
//     await this.client.connect();
//   }

//   get = async (token: string) => this.client.get<UserData>(token);

//   set = async (token: string, userData: UserData) =>
//     this.client.set<UserData>(token, userData, { ttl: 3600 });

//   verifyAddress = async (publicAddress: string, userData: UserData) => {
//     if (
//       userData.publicAddress.findIndex(
//         (wAddress) => wAddress === toChecksumAddress(publicAddress)
//       ) === -1
//     )
//       throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
//     else userData.currentpublicAddress = publicAddress;
//     return userData;
//   };
// }

import { Cache } from "cache-manager";
import { toChecksumAddress } from "ethereumjs-util";
import { createClient } from "redis";
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import { UserData } from "./auth.types";

@Injectable()
export class AuthService {
  private client;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    // this.start();
  }

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
