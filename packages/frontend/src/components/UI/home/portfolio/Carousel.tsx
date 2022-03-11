import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { wrap } from "popmotion"
import { Box, HStack, SimpleGrid } from "@sipher.dev/sipher-ui"

import { NFTCard } from "@components/UI/portfolio/nfts"

interface SlideshowProps {
  isAuto?: boolean
  deplay?: number
  slideData: Record<string, any>
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export const Carousel = ({ deplay = 5000, slideData, isAuto = false }: SlideshowProps) => {
  const [[page, direction], setPage] = useState([0, 0])
  const pageSize = 3
  const pageNumber =
    slideData.length > 0
      ? slideData.length % pageSize > 0
        ? Math.floor(slideData.length / pageSize) + 1
        : Math.floor(slideData.length / pageSize)
      : 0

  const index = wrap(0, pageNumber, page)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (isAuto) {
      resetTimeout()
      timeoutRef.current = setTimeout(() => paginate(1), deplay)

      return () => {
        resetTimeout()
      }
    }
  }, [index])

  const handleClick = (idx: number) => {
    paginate(idx < index ? idx - index + pageNumber : idx - index)
  }

  return (
    <Box pos="relative" h={["22rem"]} w="full" overflow="hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        >
          <Box pos="absolute" w="full" h="full">
            <SimpleGrid p={1} w="full" spacing={6} columns={pageSize}>
              {slideData.slice(index * pageSize, (index + 1) * pageSize).map(item => (
                <NFTCard
                  isVerified
                  key={item}
                  volume={1}
                  floorPrice={1}
                  tokenId={"1"}
                  collectionName="Sipherian Surge"
                  imageUrl="/images/nft/sipher3.png"
                />
              ))}
            </SimpleGrid>
          </Box>
        </motion.div>
      </AnimatePresence>
      <HStack pos="absolute" bottom={0} left="50%" transform="translate(-50%, -1rem)" align="center">
        {Array.from(Array(pageNumber).keys()).map((_, idx) => (
          <Box
            cursor="pointer"
            onClick={() => handleClick(idx)}
            key={idx}
            bg={index === idx ? "white" : "whiteAlpha.500"}
            w="16px"
            h={index === idx ? "4px" : "2px"}
            rounded="full"
          />
        ))}
      </HStack>
    </Box>
  )
}
