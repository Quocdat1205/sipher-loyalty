import { Module } from '@nestjs/common';
import { LootBoxController } from './lootbox.controller';
import { LootBoxService } from './lootbox.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lootbox } from '@entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Lootbox])],
  providers: [LootBoxService],
  controllers: [LootBoxController],
  exports: [LootBoxService],
})
export class LootBoxModule {}
