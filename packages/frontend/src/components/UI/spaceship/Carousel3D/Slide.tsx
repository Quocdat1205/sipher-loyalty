import React from "react"
import { animated, config, Spring } from "react-spring"

interface IProps {
  content: JSX.Element
  onClick?: () => void
  offsetRadius: number
  index: number
}

export default function Slide({ content, offsetRadius, index, onClick }: IProps) {
  const offsetFromCenter = index - offsetRadius
  const totalPresentables = 2 * offsetRadius + 1
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1))

  const translateXoffset = 50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1))
  let translateX = -50

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0
    } else if (index === totalPresentables - 1) {
      translateX = -100
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset
  }

  return (
    <Spring
      to={{
        transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
        left: `${offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius}%`,
        opacity: distanceFactor * distanceFactor,
      }}
      config={config.molasses}
    >
      {styles => (
        <animated.div
          style={{
            ...styles,
            position: "absolute",
            height: "100%",
            top: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "50% 50%",
            zIndex: Math.abs(Math.abs(offsetFromCenter) - 2),
          }}
          onClick={onClick}
        >
          {content}
        </animated.div>
      )}
    </Spring>
  )
}
