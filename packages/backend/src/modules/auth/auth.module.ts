import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import constant from "@setting/constant";

import { AuthService } from "./auth.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: constant.SECRET_KEY,
      signOptions: { expiresIn: constant.JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
