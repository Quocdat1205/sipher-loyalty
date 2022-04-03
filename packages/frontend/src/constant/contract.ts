export const INU_ADDRESS = process.env.NEXT_SC_INU || "0x4d91fa57abfead5fbc8445e45b906b85bbd9744c" //test

export const NEKO_ADDRESS = process.env.NEXT_SC_NEKO || "0x97c8480d593b93ae90f8613a5b2ac02e7a3dd0ed" //test

export const EXCHANGE_V2_ADDRESS = "0x21E77f475E8B4eA1500A083905CD642044C4eF7A" //test

export const TRANSFER_PROXY_ADDRESS = "0xC399b4C40AaE47bb17f3C5e03F5CEc337C365C8a" //test

export const WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab" // WETH //test

export const TRANSFER_ERC20_PROXY_ADDRESS = "0x5acFbF9681fD5e9A32E74EFB7Fd0CA794138aBe6" //test

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const SipherTokenAddress = "0x9F52c8ecbEe10e00D9faaAc5Ee9Ba0fF6550F511" // main\

export const LPSipherWethUniswapAddress = "0xF3fDcfbfdB96315FC628854627BDd5e363b3aDE4" // main

export const LPSipherWethKyberAddress = "0x9A56f30fF04884cB06da80cB3aEf09c6132f5E77" // main

export const ViewAddress = "0xA8317c540bC1268F98E042a20fE19057E85d6277" // main

export const StakingPoolAddress = "0x7EE4b5dbc4b97C30A08791CE8601E695735960dB" // main

export const StakingLPSipherWethUniswapAddress = "0x5b2D34C26B5eb7388F54a3E8D4bE3Ac24E7616f9" // main

export const StakingLPSipherWethKyberAddress = "0xEB3CadDe330a4AA3D627F666aEcdD6F65208B19F" //main

export const SipherAirdropsAddress = "0x0b761403fdc1E7CD8763cCd89D0b269AcFDc4926" //main

export const SipherLootBoxAddress = process.env.NEXT_SC_LOOTBOX || "0x3E445D426c8FdE12F5F0C223019CA9158f7Da93B" //test

export const SipherSculptureAddress = process.env.NEXT_SC_SCULPTURE || "0X3EDB954303D0A13EE347C6989189294B0422E7D6" // test

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
  {
    name: "Sipherian Sculpture",
    address: SipherSculptureAddress,
  },
  {
    name: "Sipher Lootbox",
    address: SipherLootBoxAddress,
  },
] as const
