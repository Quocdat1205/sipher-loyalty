import { ActivityLogs, Address, TransactionLogs, User } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@modules/auth/auth.module";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, TransactionLogs, ActivityLogs]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
