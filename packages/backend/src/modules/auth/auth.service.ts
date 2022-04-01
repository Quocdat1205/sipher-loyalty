import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { LoggerService } from "@modules/logger/logger.service";

import { UserData, UserRole } from "./auth.types";

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

  verifyAdmin = async (userData: UserData, userRole: UserRole) => {
    if (userData.roles.findIndex((role) => role === userRole) === -1) {
      LoggerService.warn(
        `not permisson, user data ${JSON.stringify(userData)}`
      );
      throw new HttpException("ACCESS DENIED !", HttpStatus.BAD_REQUEST);
    }
  };
}
