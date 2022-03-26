import { useQuery } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"

import { useAuth } from "src/providers/auth"

export const useOwnedWallets = () => {
  const { authenticated, user } = useAuth()
  const { data: ownedWallets } = useQuery(["owned-wallets", user?.email], () => AtherIdAuth.ownedWallets(), {
    initialData: [],
    enabled: authenticated,
  })
  return ownedWallets!.map(w => w.address) as string[]
}
