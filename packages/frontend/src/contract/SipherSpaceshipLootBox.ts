import { BigNumber, Contract, ethers, providers } from "ethers"

import { SipherLootBoxAddress } from "@constant"
import { SipherSpaceshipLootBoxAbi } from "src/constant/abi"

interface mintProps {
  deadline: number
  batchID: number
  amount: number
  salt: string
  signature: string
}

interface mintBatchProps {
  deadline: number
  batchIDs: number[]
  amounts: number[]
  salt: string
  signature: string
}

interface burnProps {
  batchID: number
  amount: number
}

interface burnBatchProps {
  batchIDs: number[]
  amounts: number[]
}

export class SipherSpaceshipLootBox {
  provider: providers.Web3Provider
  contract: Contract

  constructor(provider: providers.Web3Provider) {
    this.provider = provider
    this.contract = new ethers.Contract(SipherLootBoxAddress, SipherSpaceshipLootBoxAbi, provider)
  }

  private x2GasPrice = async () => (await this.provider.getGasPrice()).mul(2)

  async mintBatch({ deadline, batchIDs, amounts, salt, signature }: mintBatchProps) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).mintBatch(deadline, batchIDs, amounts, salt, signature, {
      gasPrice: await this.x2GasPrice(),
    })

    await tx.wait()
  }

  async mint({ deadline, batchID, amount, salt, signature }: mintProps) {
    const signer = this.provider.getSigner()

    const tx = await this.contract
      .connect(signer)
      .mint(deadline, batchID, amount, salt, signature, { gasPrice: await this.x2GasPrice() })
    await tx.wait()
  }

  async burn({ batchID, amount }: burnProps) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).burn(batchID, amount, { gasPrice: await this.x2GasPrice() })
    await tx.wait()
  }

  async burnBatch({ batchIDs, amounts }: burnBatchProps) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).burnBatch(batchIDs, amounts, { gasPrice: await this.x2GasPrice() })
    await tx.wait()
  }

  async cancelOrder(signature: string) {
    const signer = this.provider.getSigner()

    const tx = await this.contract.connect(signer).cancelOrder(signature, { gasPrice: await this.x2GasPrice() })
    await tx.wait()
  }
}
