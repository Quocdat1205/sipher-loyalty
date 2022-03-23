import { useQuery } from "react-query"
import axios from "axios"
import { useWalletContext } from "@web3"

const baseURL = "https://be.sipher.xyz/api/"
const fetcher = axios.create({ baseURL: baseURL })

export const getSipherPrice = async (): Promise<number> => {
  const { data } = await fetcher.get("/price/sipher")
  return data
}

export const getETHPrice = async (): Promise<number> => {
  const { data } = await fetcher.get("price/ether")
  return data
}

export const getSipherPriceChange = async (): Promise<number> => {
  const { data } = await fetcher.get("/price/sipher/change")
  return data
}

export const useSipherPrice = () => {
  const { data } = useQuery("sipher-price", getSipherPrice, {
    initialData: 0,
  })

  return data as number
}

export const useSipherChangePercent = () => {
  const { data } = useQuery("sipher-change", getSipherPriceChange, {
    initialData: 0,
  })

  return data as number
}

export const useETHPrice = () => {
  const { data } = useQuery("eth-price", getETHPrice, {
    initialData: 0,
  })

  return data as number
}

export const useLpUniswapPrice = () => {
  const { scCaller } = useWalletContext()
  const { data: lpUniswapPrice } = useQuery(["lp-price", "uniswap"], () => scCaller.current?.getLpUniswapPrice(), {
    initialData: 0,
    enabled: !!scCaller.current,
  })
  return lpUniswapPrice as number
}

export const useLpKyberPrice = () => {
  const { scCaller } = useWalletContext()
  const { data: lpKyberPrice } = useQuery(["lp-price", "kyber"], () => scCaller.current?.getLpKyberPrice(), {
    initialData: 0,
    enabled: !!scCaller.current,
  })
  return lpKyberPrice as number
}
