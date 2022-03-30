import React, { Fragment } from "react"
import { chakra, Flex } from "@sipher.dev/sipher-ui"

import { SpaceshipDataProps } from "./useOverview"

const opacityArr = ["10%", "40%", "40%", "60%", "80%", "100%", "80%", "60%", "40%", "40%", "10%"]
interface TimelineProps {
  mappedData: SpaceshipDataProps[]
}

function defaultPointElement(center: [number, number], i: number, title: string, isActive: boolean): React.ReactNode {
  return (
    <Fragment key={i}>
      <chakra.circle
        cx={center[0]}
        cy={center[1]}
        r="6"
        fill={isActive ? "accent.500" : "white"}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="20"
      ></chakra.circle>
      <text
        x={center[0]}
        y={center[1] - 40}
        alignmentBaseline="middle"
        textAnchor="middle"
        fill={isActive ? "#F4B433" : "white"}
        fontWeight={600}
        fontSize={16}
      >
        {title}
      </text>
    </Fragment>
  )
}

export const Timeline = ({ mappedData }: TimelineProps) => {
  return (
    <Flex align="center" justify="center" mb={16} pos="relative">
      <chakra.svg height="200" viewBox="300 300 1200 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1">
            {opacityArr.map((item, index) => (
              <stop key={index} offset={`${index * 10}%`} stopColor={"#9091A0"} stopOpacity={item} />
            ))}
          </linearGradient>
        </defs>
        <path
          id="myPath"
          strokeWidth="2"
          d="M 300 300 C 600 400, 1200 400, 1500 300"
          stroke="url(#grad1)"
          fill="transparent"
        />
        {mappedData.map((item, index) => {
          return defaultPointElement([(index + 1) * 160 + 250, item.y], index, item.id, item.isActive || false)
        })}
      </chakra.svg>
    </Flex>
  )
}
