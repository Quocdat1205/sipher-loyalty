export const INU_ADDRESS = "0x4d91fa57abfead5fbc8445e45b906b85bbd9744c"

export const NEKO_ADDRESS = "0x97c8480d593b93ae90f8613a5b2ac02e7a3dd0ed"

export const EXCHANGE_V2_ADDRESS = "0x21E77f475E8B4eA1500A083905CD642044C4eF7A"

export const TRANSFER_PROXY_ADDRESS = "0xC399b4C40AaE47bb17f3C5e03F5CEc337C365C8a"

export const WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab" // WETH

export const TRANSFER_ERC20_PROXY_ADDRESS = "0x5acFbF9681fD5e9A32E74EFB7Fd0CA794138aBe6"

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const SipherTokenAddress = "0x9F52c8ecbEe10e00D9faaAc5Ee9Ba0fF6550F511" // main

export const PRICE_TYPE = [
  { id: "ETH", contract: ZERO_ADDRESS },
  { id: "WETH", contract: WETH_ADDRESS },
]

export const DATA_V2_TYPE = {
  components: [
    {
      components: [
        {
          name: "account",
          type: "address",
        },
        {
          name: "value",
          type: "uint96",
        },
      ],
      name: "payouts",
      type: "tuple[]",
    },
    {
      components: [
        {
          name: "account",
          type: "address",
        },
        {
          name: "value",
          type: "uint96",
        },
      ],
      name: "originFees",
      type: "tuple[]",
    },
    {
      name: "isMakeFill",
      type: "bool",
    },
  ],
  name: "data",
  type: "tuple",
}

export const CONTRACT_TOKEN_ID = {
  contract: "address",
  tokenId: "uint256",
}

export const NftContracts = [
  {
    name: "Sipherian Surge",
    address: INU_ADDRESS,
  },
  {
    name: "Sipherian Flash",
    address: NEKO_ADDRESS,
  },
] as const
