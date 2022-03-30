import { isEthereumAddress } from "class-validator";
import { toChecksumAddress } from "ethereumjs-util";
import { ethers } from "ethers";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";

import { UserData } from "./auth.types";

@Injectable()
export class AuthService {
  verifyAddress = async (publicAddress: string, userData: UserData) => {
    if (!isEthereumAddress(publicAddress)) {
      throw new HttpException("Invalid public address", HttpStatus.BAD_REQUEST);
    }
    if (
      userData.publicAddress.findIndex(
        (wAddress) => wAddress === toChecksumAddress(publicAddress)
      ) === -1
    )
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    else userData.currentpublicAddress = publicAddress;
    return userData;
  };

  verifyKey = async (key: string, userData: UserData) => {
    const wallet = new ethers.Wallet(constant.PRIVATE_KEY);
    if (key !== wallet.address) {
      LoggerService.warn(`key wrong of user data ${JSON.stringify(userData)}`);
      throw new HttpException("key wrong", HttpStatus.BAD_REQUEST);
    }
    if (
      userData.publicAddress.findIndex(
        (wAddress) => wAddress === toChecksumAddress(key)
      ) === -1
    ) {
      LoggerService.warn(
        `user not owned key of user data ${JSON.stringify(userData)}`
      );
      throw new HttpException("user not owned key", HttpStatus.BAD_REQUEST);
    }
  };
}
