import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Box, Flex, HStack } from "@sipher.dev/sipher-ui"

interface SlideshowProps {
  slideData: React.ReactNode[]
  page: number
  handleClick: (idx: number) => void
  direction: number
  index: number
  children: React.ReactNode
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

export const StepComponent = ({ children, slideData, page, direction, index, handleClick }: SlideshowProps) => {
  return (
    <Flex flexDir="column" align="center">
      <Box mb={4} pos="relative" boxSize={"26rem"} overflow="hidden" bg="#151515">
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
          >
            <Box pos="absolute" w="full" h="full">
              {slideData[index]}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
      <HStack mb={4} align="center">
        {slideData.map((_, idx) => (
          <Box
            onClick={() => handleClick(idx)}
            cursor="pointer"
            key={idx}
            bg={index === idx ? "white" : "whiteAlpha.500"}
            w="16px"
            h={index === idx ? "4px" : "2px"}
            rounded="full"
          />
        ))}
      </HStack>
      <Box px={8}>{children}</Box>
    </Flex>
  )
}
