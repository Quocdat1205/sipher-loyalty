export * from "./abi"
export * from "./contract"
export * from "./view"

export const TOTAL_REWARDS_FOR_POOL = 50000000 // 50 millions

// export const ETHEREUM_NETWORK = 4 //test
export const POLYGON_NETWORK = parseInt(process.env.NEXT_PUBLIC_POLYGON_CHAIN || "80001", 10) //test

export const ETHEREUM_NETWORK = 1 //main
// export const POLYGON_NETWORK = 137 //main
