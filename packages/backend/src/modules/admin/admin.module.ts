import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AuthModule } from '@module/auth/auth.module';
import { SculpturesOrder, NftOrder } from '@entity';

@Module({
  imports: [TypeOrmModule.forFeature([SculpturesOrder, NftOrder]), AuthModule],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
