import { toChecksumAddress } from "ethereumjs-util";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserData } from "./auth.types";

@Injectable()
export class AuthService {
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
