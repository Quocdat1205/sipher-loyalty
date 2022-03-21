// import { CognitoJwtVerifier } from "aws-jwt-verify";
// import axios from "axios";
// import { toChecksumAddress } from "ethereumjs-util";
// import { Observable } from "rxjs";
// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from "@nestjs/common";
// import constant from "@setting/constant";
// import { LoggerService } from "@modules/logger/logger.service";

// @Injectable()
// export class AtherGuard implements CanActivate {
//   private verifier;

//   private configAtherID;

//   constructor() {
//     this.loadConfig();
//   }

//   private async loadConfig() {
//     const { data } = await axios.get(`${constant.ATHER_ID_URL}/config/client`);
//     this.configAtherID = data;
//     this.verifier = CognitoJwtVerifier.create({
//       userPoolId: this.configAtherID.userPoolId,
//       clientId: this.configAtherID.clientId,
//       tokenUse: null,
//     });
//   }

//   private async validateRequest(req: any) {
//     try {
//       const token = req.headers.authorization;
//       const cognitoJwtToken = token.split(" ")[token.split(" ").length - 1];
//       const data = await this.verifier.verify(cognitoJwtToken);

//       const userData = {
//         userID: data[0].userId,
//         publicAddress: data.map((el: any) => toChecksumAddress(el.address)),
//       };
//       req.userData = userData;
//     } catch (err) {
//       LoggerService.error(err);
//       throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
//     }
//     return true;
//   }

//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return this.validateRequest(request);
//   }
// }

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

@Injectable()
export class AtherGuard implements CanActivate {
  private async validateRequest(req: any) {
    try {
      const { data } = await axios.get(
        `${constant.ATHER_ID_URL}/wallets/owned`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
          },
        }
      );
      const userData = {
        userID: data[0].userId,
        publicAddress: data.map((el: any) => toChecksumAddress(el.address)),
      };
      req.userData = userData;
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
