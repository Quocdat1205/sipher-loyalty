import * as redisStore from "cache-manager-redis-store";
import { CacheModule, Module } from "@nestjs/common";
import constant from "@setting/constant";

import { AuthService } from "./auth.service";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: constant.SESSION_HOST,
      port: constant.SESSION_PORT,
      auth_pass: constant.SESSION_PASS,
      no_ready_check: true,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
