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
      // password: constant.SESSION_PASS,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
