import { ActivityLogs, Address, TransactionLogs, User } from "@entity"
import { AuthModule } from "@module/auth/auth.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, TransactionLogs, ActivityLogs]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
