import { useRouter } from "next/router"
import { useStore } from "@store"

export const useNFTs = () => {
  const gridSize = useStore(state => state.gridSize)
  const columns = gridSize === "small" ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]
  const router = useRouter()

  const handleClick = (collectionId: string, tokenId: string | number) => {
    router.push(`/portfolio/${collectionId}/${tokenId}`)
  }

  return { columns, handleClick }
}
