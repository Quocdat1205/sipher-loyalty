export const EIP712_NAME = "lootbox"

export const EIP712_VERSION = "1"

export const EIP712_DOMAIN_TEMPLATE = {
  name: EIP712_NAME,
  version: EIP712_VERSION,
}

export const EIP712_ORDER_TYPES = {
  Order: [
    { name: "to", type: "address" },
    { name: "batchID", type: "uint32" },
    { name: "amount", type: "uint32" },
    { name: "salt", type: "string" },
  ],
}
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
