import { useEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"

const ONE_DAY = 60 * 60 * 24
const ONE_HOUR = 60 * 60
const ONE_MINUTE = 60

const initData = [
  {
    id: "Chim Chim",
    y: "-40%",
    title: "The Wandering Alice - (both INUs and NEKOs can claim)",
    image: "/images/spaceship/ship/1.png",
  },
  {
    id: "Swordfish",
    y: "50%",
    title: "The Flik Flak - (both INUs and NEKOs)",
    image: "/images/spaceship/ship/2.png",
  },
  {
    id: "Manta",
    y: "95%",
    title: "The Akagi - (both INUs and NEKOs)",
    image: "/images/spaceship/ship/3.png",
  },
  {
    id: "Otter",
    y: "110%",
    title: "The Ahab - (both INUs and NEKOs)",
    image: "/images/spaceship/ship/4.png",
  },
  {
    id: "Dodo",
    y: "95%",
    title: "The Zed Lep - NEKO-only limited edition Loot box claim (NEKO only claim)",
    image: "/images/spaceship/ship/5.png",
  },
  {
    id: "Tui",
    y: "50%",
    title: "The Barking Baron - INU-only limited edition Loot box claim (INU only claim)",
    image: "/images/spaceship/ship/6.png",
  },
  {
    id: "Ikan",
    y: "-40%",
    title:
      "Two random ship types (any of the non-limited editions above) claimable only by INUs to compensate since they were expected to receive Spaceships before NEKO launch",
    image: "/images/spaceship/ship/7.png",
  },
]

export const useOverview = () => {
  const [data, setData] = useState(initData)
  const startTime = 1647953250000

  const weekNum = Math.floor(((new Date().getTime() - 1647953250000) % (86400000 * 7)) / (86400000 * 7))

  const mappedData = data.map((item, index) => ({ ...item, isActive: index === weekNum }))

  console.log(mappedData)

  return { mappedData }
}
