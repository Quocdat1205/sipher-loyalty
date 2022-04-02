import React, { useEffect, useRef, useState } from "react"
import { Box, Flex, HStack } from "@sipher.dev/sipher-ui"

interface CarouselProps {
  children: React.ReactNode[]
  show: number
  infiniteLoop?: boolean
  isAuto?: boolean
}

const SlideComponent = ({ children, show, infiniteLoop, isAuto = false }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
  const [length, setLength] = useState(children.length)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length)
    setIsRepeating(infiniteLoop && children.length > show)
  }, [children, infiniteLoop, show])

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true)
      }
    }
  }, [currentIndex, isRepeating, show, length])

  const next = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  // const prev = () => {
  //   if (isRepeating || currentIndex > 0) {
  //     setCurrentIndex(prevState => prevState - 1)
  //   }
  // }

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false)
        setCurrentIndex(length)
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false)
        setCurrentIndex(show)
      }
    }
  }

  const renderExtraPrev = () => {
    const output: any = []
    for (let index = 0; index < show; index++) {
      output.push(children[length - 1 - index])
    }
    output.reverse()
    return output
  }

  const renderExtraNext = () => {
    const output: any = []
    for (let index = 0; index < show; index++) {
      output.push(children[index])
    }
    return output
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    let isUnmounted = false
    if (isAuto) {
      resetTimeout()
      timeoutRef.current = setTimeout(() => {
        if (!isUnmounted) {
          next()
        }
      }, 5000)

      return () => {
        isUnmounted = true
        resetTimeout()
      }
    }
  }, [currentIndex])

  const handleClick = (idx: number) => {
    setCurrentIndex(idx + 1)
  }

  return (
    <Box overflow="hidden" pos="relative">
      <Flex w="full" flexDir="column" className="carousel-container">
        <Flex pos="relative" w="full" className="carousel-wrapper">
          <Box maxH="35rem" w="full" h="full" overflow="hidden" className="carousel-content-wrapper">
            <Flex
              transition="all 250ms linear"
              className={`carousel-content show-${show}`}
              style={{
                width: "full",
                msOverflowStyle: "none",
                transform: `translateX(-${currentIndex * (100 / show)}%)`,
                transition: !transitionEnabled ? "none" : undefined,
              }}
              onTransitionEnd={() => handleTransitionEnd()}
              sx={{ "> *": { width: "full", flexShrink: 0, flexGrow: 1 } }}
            >
              {length > show && isRepeating && renderExtraPrev()}
              {children}
              {length > show && isRepeating && renderExtraNext()}
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <HStack spacing={4} pos="absolute" bottom={0} left="50%" transform="translate(-50%, -1rem)" align="center">
        {children.map((_, idx) => (
          <Box
            cursor="pointer"
            onClick={() => handleClick(idx)}
            key={idx}
            bg={currentIndex === idx + 1 ? "white" : "whiteAlpha.500"}
            w="88px"
            h={"8px"}
          />
        ))}
      </HStack>
    </Box>
  )
}

export default SlideComponent
