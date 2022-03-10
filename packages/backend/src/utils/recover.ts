import { ethers } from "ethers"

import { EIP712_BATCH_ORDER_TYPES, EIP712_ORDER_TYPES } from "./constants"
import { createEIP712Domain, encodeBatchOrder, signer } from "./signer"
import { Order } from "./type"
import { BatchOrder } from "."

const recoverOrderSignature = (
  order: Order,
  signature: string,
  config: { chainId: number; verifyingContract: string },
) => {
  const expectedSignerAddress = signer.address
  const domain = createEIP712Domain(config.chainId, config.verifyingContract)
  const types = EIP712_ORDER_TYPES
  const recoveredAddress = ethers.utils.verifyTypedData(domain, types, order, signature)
  return recoveredAddress === expectedSignerAddress
}

const recoverBatchOrderSignature = (
  batchOrder: BatchOrder,
  signature: string,
  config: { chainId: number; verifyingContract: string },
) => {
  const expectedSignerAddress = signer.address
  const domain = createEIP712Domain(config.chainId, config.verifyingContract)
  const types = EIP712_BATCH_ORDER_TYPES
  const recoveredAddress = ethers.utils.verifyTypedData(domain, types, encodeBatchOrder(batchOrder), signature)
  return recoveredAddress === expectedSignerAddress
}

export { recoverBatchOrderSignature, recoverOrderSignature }
