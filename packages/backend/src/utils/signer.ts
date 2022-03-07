import { ethers } from "ethers"
import constant from "@setting/constant"

import { EIP712_DOMAIN_TEMPLATE, EIP712_ORDER_TYPES } from "./constants"
import { Order } from "./type"

const createEIP712Domain = (chainId: number, verifyingContract: string) => ({
  ...EIP712_DOMAIN_TEMPLATE,
  verifyingContract,
  chainId,
})

const signer = new ethers.Wallet(constant.PRIVATE_KEY)

const signOrder = async (config: { chainId: number; verifyingContract: string }, order: Order): Promise<any> => {
  const domain = createEIP712Domain(config.chainId, config.verifyingContract)

  const types = EIP712_ORDER_TYPES

  const signature = await signer._signTypedData(domain, types, order)

  return signature
}

export { createEIP712Domain, signer, signOrder }
