import { BigNumber, ethers } from "ethers"

export * from "./constant"
export * from "./urlQuery"
export const currency = (
  amount: number,
  prefix = "",
  options: {
    maximumFractionDigits: number
    minimumFractionDigits: number
  } = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  },
) => prefix + amount.toLocaleString(undefined, { ...options })

export const calWeight = (start: number, end: number) => {
  return 1 + (end - start) / 1000 / (365 * 24 * 60 * 60)
}

export const shortenAddress = (address: string | null) =>
  address ? `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}` : ""

// capitalize first letter of every words in a string
export const capitalize = (str: string) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
export const etherToWei = (amount: number | string) => ethers.utils.parseEther(amount.toString())

export const weiToEther = (wei: string | BigNumber) => ethers.utils.formatEther(wei)
