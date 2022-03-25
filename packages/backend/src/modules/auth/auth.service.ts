import { toChecksumAddress } from "ethereumjs-util";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserData } from "./auth.types";
import { isEthereumAddress } from "class-validator";

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
}
