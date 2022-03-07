import { ethers } from "ethers"

import { EIP712_ORDER_TYPES } from "./constants"
import { createEIP712Domain, signer } from "./signer"
import { Order } from "./type"

export const recoverOrderSignature = (
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
