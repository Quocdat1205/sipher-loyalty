import { Request, Response } from "express";
import { HttpService } from "@nestjs/axios";
import { Injectable, NestMiddleware } from "@nestjs/common";
import constant from "@setting/constant";

@Injectable()
export class AtherIDMiddleware implements NestMiddleware {
  constructor(private httpService: HttpService) {}

  use(req: Request, res: Response, next: () => void) {
    // const data = this.httpService.get(
    //   `${constant.ATHER_ID_URL}/wallets/owned`,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: `Bearer ${req.token}`,
    //     },
    //   }
    // );
    res.locals.user = true;
    next();
  }
}
