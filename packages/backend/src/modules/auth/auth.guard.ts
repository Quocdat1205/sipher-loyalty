import axios from "axios";
import { toChecksumAddress } from "ethereumjs-util";
import { Observable } from "rxjs";
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import constant from "@setting/constant";

import { AuthService } from "./auth.service";

@Injectable()
export class AtherGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  private async validateRequest(req: any) {
    try {
      const currentUserData = await this.authService.get(
        req.headers.authorization
      );
      if (!currentUserData) {
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
          publicAddress: data.map((el: any) => toChecksumAddress(el.address)),
        };
        await this.authService.set(req.headers.authorization, userData);
        req.userData = userData;
      } else {
        req.userData = currentUserData;
      }
    } catch (err) {
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
