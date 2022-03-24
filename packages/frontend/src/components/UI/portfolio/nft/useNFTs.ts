import { useRouter } from "next/router"

export const useNFTs = () => {
  const router = useRouter()

  const handleClick = (collectionId: string, tokenId: string | number) => {
    router.push(`/portfolio/${collectionId}/${tokenId}`)
  }

  return { handleClick }
}
