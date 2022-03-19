import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserData } from "./auth.types";

@Injectable()
export class AuthService {
  verifyAddress = async (walletAddress: string, userData: UserData) => {
    if (
      userData.walletAddress.findIndex(
        (wAddress) => wAddress === walletAddress
      ) === -1
    )
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    else userData.currentWalletAddress = walletAddress;
    return userData;
  };
}
