import { useRouter } from "next/router"

export const useAirdrops = () => {
  const router = useRouter()
  const currentTab = router.query.tab || "all"

  return { currentTab }
}
