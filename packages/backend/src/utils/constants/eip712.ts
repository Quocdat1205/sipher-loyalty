export const EIP712_LOOTBOX_NAME = "Sipher Spaceship Part";

export const EIP712_LOOTBOX_VERSION = "1.0";

export const EIP712_LOOTBOX_DOMAIN_TEMPLATE = {
  name: EIP712_LOOTBOX_NAME,
  version: EIP712_LOOTBOX_VERSION,
};

export const EIP712_LOOTBOX_BATCH_ORDER_TYPES = {
  BatchOrder: [
    { name: "to", type: "address" },
    { name: "batchID", type: "bytes" },
    { name: "amount", type: "bytes" },
    { name: "salt", type: "string" },
    { name: "deadline", type: "uint256" },
  ],
};

export const EIP712_LOOTBOX_ORDER_TYPES = {
  Order: [
    { name: "to", type: "address" },
    { name: "batchID", type: "uint256" },
    { name: "amount", type: "uint256" },
    { name: "salt", type: "string" },
    { name: "deadline", type: "uint256" },
  ],
};
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
