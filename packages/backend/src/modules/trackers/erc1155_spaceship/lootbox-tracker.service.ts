import { Contract, providers } from "ethers"
import { Injectable } from "@nestjs/common"
import { Interval } from "@nestjs/schedule"
import { erc1155Abi } from "@setting/blockchain/abis"
import { getContract, getProvider } from "@setting/blockchain/ethers"
import constant from "@setting/constant"

import { LootBoxService } from "@modules/lootbox/lootbox.service"
import { signer } from "@utils/signer"

import { LoggerService } from "../../logger/logger.service"

@Injectable()
export class LootboxTrackerService {
  private provider: providers.Provider

  private contract: Contract

  private contractWithSigner

  private fromBlock: number

  constructor(private lootBoxService: LootBoxService) {
    this.provider = getProvider(constant.CHAIN_ID)
    this.contract = getContract(constant.config.erc1155Spaceship.verifyingContract, erc1155Abi, this.provider)
    this.contractWithSigner = this.contract.connect(signer)
    this.fromBlock = 0
  }

  @Interval("tracking lootbox transfer", 15000)
  async triggerMethodBasedOnNamedInterval() {
    LoggerService.log("Triggering get owner lootbox interval 15 second")
    await this.getOwnerLootbox(this.fromBlock)
  }

  private currentBlock = async () => {
    try {
      return await this.provider.getBlockNumber()
    } catch (err) {
      return 0
    }
  }

  private getOwnerLootbox = async (_fromBlock: number) => {
    LoggerService.log(await this.currentBlock())
    LoggerService.log(this.contract)
    const pastEvents = await this.contract
      .queryFilter(this.contract.filters.TransferSingle(), _fromBlock, await this.currentBlock())
      .catch(err => {
        LoggerService.error(err, "Failed to get events")
      })
    if (!pastEvents) {
      return _fromBlock // retry
    }

    pastEvents.forEach(event => {
      const { to, tokenId } = event.args
      LoggerService.log(`${to} - ${tokenId}`)
    })
  }
}
