import { S3, User } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, S3])],
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
