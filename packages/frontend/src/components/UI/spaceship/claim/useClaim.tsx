import { useState } from "react"

import { ClaimCard } from "./ClaimCard"

const initData = [
  {
    id: 1,
    name: "Sipher Inu #1",
    imageUrl: "/images/spaceship/box.png",
  },
  {
    id: 2,
    name: "Sipher Inu #2",
    imageUrl: "/images/spaceship/box-1.png",
  },
  {
    id: 3,
    name: "Sipher Inu #3",
    imageUrl: "/images/spaceship/box-2.png",
  },
]

export const useClaim = () => {
  const [goToSlide, setGoToSlide] = useState(0)

  const claimDataElement = initData.map((i, idx) => ({
    key: i.id,
    content: <ClaimCard key={i.id} name={i.name} imageUrl={i.imageUrl} isActive={idx === goToSlide} />,
    onClick: () => setGoToSlide(idx),
  }))

  return { goToSlide, claimDataElement }
}
