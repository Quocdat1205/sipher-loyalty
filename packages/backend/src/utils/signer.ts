import { ethers } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import constant from "@setting/constant";

import {
  EIP712_LOOTBOX_BATCH_ORDER_TYPES,
  EIP712_LOOTBOX_DOMAIN_TEMPLATE,
  EIP712_LOOTBOX_ORDER_TYPES,
} from "./constants";
import { Order } from "./type";
import { BatchOrder } from ".";

const createEIP712_LOOTBOX_Domain = (
  chainId: number,
  verifyingContract: string
) => ({
  ...EIP712_LOOTBOX_DOMAIN_TEMPLATE,
  verifyingContract,
  chainId,
});

const signer = new ethers.Wallet(constant.PRIVATE_KEY);

const signOrder = async (
  config: { chainId: number; verifyingContract: string },
  order: Order
): Promise<any> => {
  const domain = createEIP712_LOOTBOX_Domain(
    config.chainId,
    config.verifyingContract
  );

  const types = EIP712_LOOTBOX_ORDER_TYPES;
  const signature = await signer._signTypedData(domain, types, order);

  return signature;
};

const encodeBatchOrder = (batchOrder: BatchOrder) => ({
  to: batchOrder.to,
  batchID: defaultAbiCoder.encode(["uint256[]"], [batchOrder.batchID]),
  amount: defaultAbiCoder.encode(["uint256[]"], [batchOrder.amount]),
  salt: batchOrder.salt,
  deadline: batchOrder.deadline,
});

const signBatchOrder = async (
  config: { chainId: number; verifyingContract: string },
  batchOrder: BatchOrder
): Promise<any> => {
  const domain = createEIP712_LOOTBOX_Domain(
    config.chainId,
    config.verifyingContract
  );

  const types = EIP712_LOOTBOX_BATCH_ORDER_TYPES;

  const signature = await signer._signTypedData(
    domain,
    types,
    encodeBatchOrder(batchOrder)
  );

  return signature;
};

export {
  createEIP712_LOOTBOX_Domain,
  encodeBatchOrder,
  signBatchOrder,
  signer,
  signOrder,
};
