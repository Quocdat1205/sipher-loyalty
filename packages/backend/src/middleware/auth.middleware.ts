import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.session.userID !== req.body.publicAddress || !req.session.userID) {
      res.locals.abc = false;
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    res.locals.abc = true;
    next();
  }
}
