import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";

@Module({
  imports: [HttpModule],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}