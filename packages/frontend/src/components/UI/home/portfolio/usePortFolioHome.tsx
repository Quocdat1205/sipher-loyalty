import { useQuery } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import { useWalletContext } from "@web3"

import { EthereumIcon, SipherIcon } from "@components/shared"
import { ETHEREUM_NETWORK } from "@constant"
import { useBalanceContext } from "@hooks"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const initialData = [
  {
    id: "0x09e0df4ae51111ca27d6b85708cfb3f1f7cae982",
    bannerImage:
      "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
    logoImage:
      "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=h600",
    name: "NEKO COLLECTION",
    total: 0,
  },
  {
    id: "0x9c57d0278199c931cf149cc769f37bb7847091e7",
    bannerImage:
      "https://lh3.googleusercontent.com/LrdoFh3E8rq43JucGYm9Xkhh0OLoERNCa5yJi98D1a6Tb0KlYGWmrmqhZF0JqsTezncOXCInL7iGnv-JV0YjIe9lSwrSknzaVW8orw=h600",
    logoImage:
      "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s0",
    name: "INU COLLECTION",
    total: 0,
  },
  {
    id: "0x3edb954303d0a13ee347c6989189294b0422e7d6",
    bannerImage:
      "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
    logoImage:
      "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
    name: "SIPHER SCULPTURE",
    total: 0,
  },
  {
    id: "0x3e445d426c8fde12f5f0c223019ca9158f7da93b",
    bannerImage:
      "https://lh3.googleusercontent.com/I3bpxVjzPhD-Gs8z5DX__anyxgqPVVYBQjtKroEBV5H7j3iFRRsjXh7uyM-9lCxB8C_1sEUNh0wCR3-wKY5XQVoMO_he68X3sRoduQ=s2500",
    logoImage:
      "https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
    name: "SIPHER LOOTBOX",
    total: 0,
  },
]

const usePortFolioHome = () => {
  const router = useRouter()
  const { bearerToken } = useAuth()
  const { account, chainId } = useWalletContext()
  const { dataPrice, balance, totalUsdPrice } = useBalanceContext()

  const { data: dataInit } = useQuery<any>(
    ["collection", account],
    () =>
      client.api.collectionControllerGetUserCollection(account!, {}, setBearerToken(bearerToken)).then(res => res.data),
    {
      enabled: !!bearerToken && !!account,
      initialData: initialData,
    },
  )

  const tokensData = account
    ? [
        {
          currency: "ETH",
          balance: chainId === ETHEREUM_NETWORK ? balance.chainPrice : 0,
          value: chainId === ETHEREUM_NETWORK ? balance.chainPrice * dataPrice!.ethereumPrice.usd : 0,
          change: dataPrice!.ethereumPrice.change * 100,
          icon: <EthereumIcon size="1.4rem" />,
        },
        // {
        //   currency: "MATIC",
        //   balance: chainId === POLYGON_NETWORK ? balance.chainPrice : 0,
        //   value: chainId === POLYGON_NETWORK ? balance.chainPrice * dataPrice!.maticPrice.usd : 0,
        //   change: dataPrice!.maticPrice.change * 100,
        //   icon: <Img src="/images/icons/matic.png" alt="matic" h="1.4rem" />,
        // },
        {
          currency: "SIPHER",
          balance: balance.sipher,
          value: balance.sipher * dataPrice!.sipherPrice.usd,
          change: dataPrice!.sipherPrice.change * 100,
          icon: <SipherIcon size="1.4rem" />,
        },
      ]
    : []

  const collectionData = dataInit?.map(item => ({
    ...item,
    onView: () => router.push(`/portfolio/${item.id}`),
  }))

  const totalNFTs = collectionData.reduce((acc, curr) => acc + curr.total, 0)
  const totalToken = tokensData.length

  return { totalNFTs, totalToken, totalUsdPrice, tokensData, collectionData }
}
export default usePortFolioHome
