import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { LoggerService } from "../logger/logger.service";

import { signAdmin, signUser } from "./auth.type";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getTokenUser(user: signUser) {
    const payload = { publicAddress: user.publicAddress, nonce: user.nonce };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async getTokenAdmin(admin: signAdmin) {
    const payload = { username: admin.username };

    const token = this.jwtService.sign(payload);
    LoggerService.log(token);

    return token;
  }
}
