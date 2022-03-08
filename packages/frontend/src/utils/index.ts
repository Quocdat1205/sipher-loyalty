export * from "./urlQuery"
export * from "./constant"
export const currency = (
    amount: number,
    prefix = "",
    options: {
        maximumFractionDigits: number
        minimumFractionDigits: number
    } = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }
) => prefix + amount.toLocaleString(undefined, { ...options })

export const shortenAddress = (address: string | null) =>
    address
        ? `${address.slice(0, 6)}...${address.slice(
              address.length - 4,
              address.length
          )}`
        : ""

// capitalize first letter of every words in a string
export const capitalize = (str: string) => {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}
