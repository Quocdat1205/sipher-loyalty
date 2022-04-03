import { CognitoJwtVerifier } from "aws-jwt-verify";
import axios from "axios";
import { Request } from "express";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import constant from "@setting/constant";

import { CacheService } from "@modules/cache/cache.service";
import { LoggerService } from "@modules/logger/logger.service";

import { UserData, UserRole } from "./auth.types";

@Injectable()
export class AuthService {
  private verifier;

  private configAtherID;

  constructor(private cacheService: CacheService) {
    this.loadConfig();
  }

  private async loadConfig() {
    const { data } = await axios.get(
      `${constant.ATHER_ID_URL}/api/config/client`
    );
    this.configAtherID = data;
    this.verifier = CognitoJwtVerifier.create({
      userPoolId: this.configAtherID.userPoolId,
      clientId: this.configAtherID.clientId,
      tokenUse: null,
    });
  }

  fetchUserData = async (req: Request) => {
    try {
      const token = req.headers.authorization.trim().split(" ").pop();
      const dataAWSUser = await this.verifier.verify(token);
      const roles = dataAWSUser["cognito:groups"];

      const { data } = await axios.get(
        `${constant.ATHER_ID_URL}/api/wallets/owned`,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      );

      const userData = {
        userId: data[0].userId,
        publicAddress: data.map((el: any) => el.address.toLowerCase()),
        roles,
      };
      await this.cacheService.set(req.headers.authorization, userData);
      req.userData = userData;

      return userData;
    } catch (err) {
      LoggerService.error(err);
    }
  };

  async validateRequest(req: Request) {
    try {
      const currentUserData = await this.cacheService.get(
        req.headers.authorization
      );

      if (!currentUserData) {
        await this.fetchUserData(req);
      } else {
        req.userData = currentUserData;
      }
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("validate failed", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  verifyAddress = async (publicAddress: string, req: Request) => {
    if (
      !req.userData ||
      req.userData.publicAddress.findIndex(
        (wAddress) => wAddress.toLowerCase() === publicAddress.toLowerCase()
      ) === -1
    ) {
      this.fetchUserData(req);
      throw new HttpException(
        "user not owned public address",
        HttpStatus.UNAUTHORIZED
      );
    } else req.userData.currentpublicAddress = publicAddress.toLowerCase();
    return req.userData;
  };

  verifyAdmin = async (req: Request, userRole: UserRole) => {
    if (
      !req.userData ||
      req.userData.roles.findIndex((role) => role === userRole) === -1
    ) {
      LoggerService.warn(
        `not permisson, user data ${JSON.stringify(req.userData)}`
      );
      this.fetchUserData(req);
      throw new HttpException("ACCESS DENIED !", HttpStatus.BAD_REQUEST);
    }
  };
}
