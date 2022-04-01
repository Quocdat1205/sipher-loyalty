import { ethers } from "ethers";
import constant from "@setting/constant";

import {
  EIP712_LOOTBOX_BATCH_ORDER_TYPES,
  EIP712_LOOTBOX_ORDER_TYPES,
} from "./constants";
import { createEIP712_LOOTBOX_Domain, encodeBatchOrder } from "./signer";
import { Order } from "./type";
import { BatchOrder } from ".";

const recoverOrderSignature = async (
  order: Order,
  signature: string,
  config: { chainId: number; verifyingContract: string }
) => {
  const signer = new ethers.Wallet(await constant.getPRIVATE_KEY_LOYALTY());
  const expectedSignerAddress = signer.address;
  const domain = createEIP712_LOOTBOX_Domain(
    config.chainId,
    config.verifyingContract
  );
  const types = EIP712_LOOTBOX_ORDER_TYPES;
  const recoveredAddress = ethers.utils.verifyTypedData(
    domain,
    types,
    order,
    signature
  );
  return recoveredAddress === expectedSignerAddress;
};

const recoverBatchOrderSignature = async (
  batchOrder: BatchOrder,
  signature: string,
  config: { chainId: number; verifyingContract: string }
) => {
  const signer = new ethers.Wallet(await constant.getPRIVATE_KEY_LOYALTY());
  const expectedSignerAddress = signer.address;
  const domain = createEIP712_LOOTBOX_Domain(
    config.chainId,
    config.verifyingContract
  );
  const types = EIP712_LOOTBOX_BATCH_ORDER_TYPES;
  const recoveredAddress = ethers.utils.verifyTypedData(
    domain,
    types,
    encodeBatchOrder(batchOrder),
    signature
  );
  return recoveredAddress === expectedSignerAddress;
};

export { recoverBatchOrderSignature, recoverOrderSignature };
