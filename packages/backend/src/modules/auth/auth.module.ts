import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import constant from '@setting/constant';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

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
