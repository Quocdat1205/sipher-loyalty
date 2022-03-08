import React, { useState } from "react"
import { chakra, Skeleton, Text, TextProps } from "@sipher.dev/sipher-ui"

interface TextReadMoreProps extends TextProps {
  text: string
  isLoaded?: boolean
}

export const TextReadMore = ({ text, isLoaded = true, ...rest }: TextReadMoreProps) => {
  const [isReadMore, setIsReadmore] = useState(false)

  return (
    <Skeleton py={6} flex={1} isLoaded={isLoaded}>
      <Text {...rest}>
        {!isReadMore ? text.slice(0, 150) : text}
        <chakra.span>{!isReadMore ? "... " : " "}</chakra.span>
        {text.length > 150 && (
          <chakra.span cursor="pointer" color="cyan.600" onClick={() => setIsReadmore(!isReadMore)}>
            {!isReadMore ? "Read more" : "Show less"}
          </chakra.span>
        )}
      </Text>
    </Skeleton>
  )
}
