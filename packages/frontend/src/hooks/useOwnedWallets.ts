import { useQuery } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"

export const useOwnedWallets = () => {
  const { data: ownedWallets } = useQuery("owned-wallets", () => AtherIdAuth.ownedWallets(), { initialData: [] })
  return ownedWallets!.map(w => w.address) as string[]
}
