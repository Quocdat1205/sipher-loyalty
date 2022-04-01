import { CognitoJwtVerifier } from "aws-jwt-verify";
import axios from "axios";
import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import constant from "@setting/constant";

import { AuthService } from "./auth.service";
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
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.authService.validateRequest(request);
  }
}
