import { ethers } from "ethers";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";

import { UserData } from "./auth.types";

@Injectable()
export class AuthService {
  verifyAddress = async (publicAddress: string, userData: UserData) => {
    if (
      userData.publicAddress.findIndex(
        (wAddress) => wAddress.toLowerCase() === publicAddress.toLowerCase()
      ) === -1
    )
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    else userData.currentpublicAddress = publicAddress.toLowerCase();
    return userData;
  };

  verifyKey = async (key: string, userData: UserData) => {
    const wallet = new ethers.Wallet(constant.PRIVATE_KEY);
    if (key.toLowerCase() !== wallet.address.toLowerCase()) {
      LoggerService.warn(`key wrong of user data ${JSON.stringify(userData)}`);
      throw new HttpException("key wrong", HttpStatus.BAD_REQUEST);
    }
    if (
      userData.publicAddress.findIndex(
        (wAddress) => wAddress === key.toLowerCase()
      ) === -1
    ) {
      LoggerService.warn(
        `user not owned key of user data ${JSON.stringify(userData)}`
      );
      throw new HttpException("user not owned key", HttpStatus.BAD_REQUEST);
    }
  };
}
