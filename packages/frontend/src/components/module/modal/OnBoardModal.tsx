import React, { Fragment, useState } from "react"
import { wrap } from "popmotion"
import { Box, Button, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import { Slide1, Slide2, StepComponent } from "./slide"

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

const slideData = [<Slide1 />, <Slide2 />, <Slide1 />]

export const OnBoardModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const [[page, direction], setPage] = useState([0, 0])

  const index = wrap(0, slideData.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleClick = (idx: number) => {
    paginate(idx < index ? idx - index + slideData.length : idx - index)
  }

  return (
    <ChakraModal isCentered title={""} isOpen={isOpen} onClose={onClose} size="md">
      <Flex mb={4} align="center" justify="center">
        <StepComponent slideData={slideData} page={page} direction={direction} index={index} handleClick={handleClick}>
          {index === 0 ? (
            <Fragment>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Ather Labs - Gaming Entertainment
              </Text>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Studio Utilizing Blockchain
              </Text>
            </Fragment>
          ) : index === 1 ? (
            <Fragment>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Access to Ather Labs' Platforms &
              </Text>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Games with one Ather Account
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Enjoy extra Benefits &
              </Text>
              <Text fontSize="lg" fontWeight={600} textAlign="center">
                Earn exclusive Rewards
              </Text>
            </Fragment>
          )}
        </StepComponent>
      </Flex>
      <Box h="3rem">
        {index === slideData.length - 1 ? (
          <Box textAlign="center" w="full">
            <Button onClick={onClose} letterSpacing="1px" fontSize="md" w="12rem" py={6}>
              GET STARTED
            </Button>
          </Box>
        ) : (
          <HStack py={4} justify="space-between">
            <Button onClick={onClose} variant="ghost" color="accent.500" fontSize="md">
              SKIP
            </Button>
            <Button onClick={() => paginate(1)} variant="ghost" color="neutral.200" fontSize="md">
              NEXT
            </Button>
          </HStack>
        )}
      </Box>
    </ChakraModal>
  )
}
