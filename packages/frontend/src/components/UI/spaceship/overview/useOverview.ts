import { useState } from "react"
import { differenceInSeconds } from "date-fns"

export interface SpaceshipDataProps {
  id: string
  week: number
  y: string
  title: string
  image: string
  mainDescription: string
  additionalDescription: string
  isActive?: boolean
}

const initData: SpaceshipDataProps[] = [
  {
    week: 1,
    id: "THE WANDERING ALICE",
    y: "-0.5rem",
    title: "The Wandering Alice",
    image: "/images/spaceship/ship/4.png",
    mainDescription: "On every adventure, THE WANDERING ALICE grows more and more curious.",
    additionalDescription:
      "The WANDERING ALICE has a knack for discovering the unknown. Benefits are tied to exploration and bringing treasures or loot back to the player.",
  },
  {
    week: 2,
    id: "THE FLIK FLAK",
    y: "1.2rem",
    title: "The Flik Flak",
    image: "/images/spaceship/ship/1.png",
    mainDescription: "This acrobatic trickster feels right at home in the air.",
    additionalDescription: `The FLIK FLAK is all about mobility.  Pilots that fly this ship understand that it's very important to avoid getting touched. As long as you’re alive, you’re a threat.`,
  },
  {
    week: 3,
    id: "THE AKAGI",
    y: "2rem",
    title: "The Akagi",
    image: "/images/spaceship/ship/3.png",
    mainDescription: "High risk, high reward - there’s no gamble too large for the AKAGI",
    additionalDescription: `The AKAGI is for those who have reached the peak of their craft. Why worry about being a glass cannon when you don’t take any damage? This ship is the definition of High Risk, High reward.`,
  },
  {
    week: 4,
    id: "THE AHAB",
    y: "2.25rem",
    title: "The Ahab",
    image: "/images/spaceship/ship/2.png",
    mainDescription: "This wicked whirlwind is a ceaseless pursuer.",
    additionalDescription: `The only way to win is by going forward. The AHAB rewards agression and bringing the fight to the enemy.`,
  },
  {
    week: 5,
    id: "THE ZED LEP",
    y: "2rem",
    title: "The Zed Lep",
    image: "/images/spaceship/ship/5.png",
    mainDescription: "This NEKO ship will send enemies up the stairway to heaven.",
    additionalDescription: `The ZED LEPs are for NEKO mains. These ships confer bonuses to NEKO-specific weapons and their racial abilities. Only NEKO Pilots fully understand these ships.`,
  },
  {
    week: 6,
    id: "THE BARKING BARON",
    y: "1.2rem",
    title: "The Barking Baron - INU-only limited edition Loot box claim (INU only claim)",
    image: "/images/spaceship/ship/6.png",
    mainDescription: "This INU ship is named after the legendary dogfighter pilot - the Red Baron",
    additionalDescription: `All INU fanatics sport this ship. Everyone wishes they could possess a BARKING BARON and reach the same acclaim as the legendary Red Baron, but only INUs are considered experts at flying these ships.`,
  },
  {
    week: 7,
    id: "MYSTERY BOX",
    y: "-0.5rem",
    title: "The Barking Baron - INU-only limited edition Loot box claim (INU only claim)",
    image: "/images/spaceship/ship/6.png",
    mainDescription: "This INU ship is named after the legendary dogfighter pilot - the Red Baron",
    additionalDescription: `All INU fanatics sport this ship. Everyone wishes they could possess a BARKING BARON and reach the same acclaim as the legendary Red Baron, but only INUs are considered experts at flying these ships.`,
  },
]

const useOverview = () => {
  const [data] = useState(initData)
  const ONE_DAY = 60 * 60 * 24
  const startTime = 1647953250000
  const weekNum = Math.floor(differenceInSeconds(new Date(), new Date(startTime)) / (ONE_DAY * 7)) % 7
  const mappedData = data.map((item, index) => ({ ...item, isActive: index === weekNum }))

  const activeData = mappedData.find(item => item.isActive)!

  return { mappedData, activeData }
}

export default useOverview
