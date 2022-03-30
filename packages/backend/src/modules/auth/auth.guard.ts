import { CognitoJwtVerifier } from "aws-jwt-verify";
import axios from "axios";
import { Observable } from "rxjs";
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import constant from "@setting/constant";

import { CacheService } from "@modules/cache/cache.service";
import { LoggerService } from "@modules/logger/logger.service";

import { UserData } from "./auth.types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userData: UserData;
    }
  }
}

@Injectable()
export class AtherGuard implements CanActivate {
  private verifier;

  private configAtherID;

  constructor(private cacheService: CacheService) {
    this.loadConfig();
  }

  private async loadConfig() {
    const { data } = await axios.get(`${constant.ATHER_ID_URL}/config/client`);
    this.configAtherID = data;
    this.verifier = CognitoJwtVerifier.create({
      userPoolId: this.configAtherID.userPoolId,
      clientId: this.configAtherID.clientId,
      tokenUse: null,
    });
  }

  private async validateRequest(req: any) {
    try {
      const currentUserData = await this.cacheService.get(
        req.headers.authorization
      );

      if (!currentUserData) {
        const token = req.headers.authorization.trim().split(" ").pop();
        const dataAWSUser = await this.verifier.verify(token);
        const roles = dataAWSUser["cognito:groups"];
        const { data } = await axios.get(
          `${constant.ATHER_ID_URL}/wallets/owned`,
          {
            headers: {
              Authorization: `Bearer ${req.headers.authorization}`,
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
      } else {
        req.userData = currentUserData;
      }
    } catch (err) {
      LoggerService.error(err);
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
}
