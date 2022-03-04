import { Injectable } from '@nestjs/common';
import { signUser, signAdmin } from './auth.type';
import { JwtService } from '@nestjs/jwt';

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
    console.log(token);

    return token;
  }
}
