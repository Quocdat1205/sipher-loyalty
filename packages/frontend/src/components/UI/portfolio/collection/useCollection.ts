import { useRouter } from "next/router"
import { useStore } from "@store"

export const useCollection = () => {
  const gridSize = useStore(state => state.gridSize)
  const columns = gridSize === "small" ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]
  const router = useRouter()

  const handleClick = (id: string | number) => {
    router.push(`/portfolio/${id}`)
  }

  return { columns, handleClick }
}
