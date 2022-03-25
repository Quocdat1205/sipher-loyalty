import { Module } from "@nestjs/common";

import { RedisCacheModule } from "@modules/cache/cache.module";

import { AuthService } from "./auth.service";

@Module({
  imports: [RedisCacheModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
