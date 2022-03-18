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
      req.userData = data;
    } catch (err) {
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
      return false;
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
