import React, { useState } from "react"
import { chakra, Skeleton, Text, TextProps } from "@sipher.dev/sipher-ui"

interface TextReadMoreProps extends TextProps {
  text: string
  textLength?: number
  isLoaded?: boolean
}

export const TextReadMore = ({ text, textLength = 100, isLoaded = true, ...rest }: TextReadMoreProps) => {
  const [isReadMore, setIsReadmore] = useState(false)

  return (
    <Skeleton flex={1} isLoaded={isLoaded}>
      <Text {...rest}>
        {!isReadMore ? text.slice(0, textLength) : text}
        {/* <chakra.span>{!isReadMore ? "... " : " "}</chakra.span> */}
        {text.length > 150 && (
          <chakra.span
            cursor="pointer"
            color="cyan.600"
            onClick={e => {
              e.stopPropagation()
              setIsReadmore(!isReadMore)
            }}
          >
            {!isReadMore ? " ..." : "Show less"}
          </chakra.span>
        )}
      </Text>
    </Skeleton>
  )
}
