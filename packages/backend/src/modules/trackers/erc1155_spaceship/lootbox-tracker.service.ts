import { Injectable } from "@nestjs/common"
import { Interval } from "@nestjs/schedule"

import { LootBoxService } from "@modules/lootbox/lootbox.service"

import { LoggerService } from "../../logger/logger.service"

@Injectable()
export class LootboxTrackerService {
  constructor(private lootBoxService: LootBoxService) {}

  @Interval("tracking lootbox transfer", 15000)
  triggerMethodBasedOnNamedInterval() {
    LoggerService.log("Triggering get owner lootbox interval 15 second")
  }

  private getOwnerLootbox = async () => {
    
  }
}
