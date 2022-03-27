import React, { useEffect, useState } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { Box, Button, Flex, Text } from "@sipher.dev/sipher-ui"

import { useWidth } from "@hooks"

import { ContentDetails } from "./ContentDetails"
import { HeaderDetails } from "./HeaderDetails"
import { useDetailBox } from "./useDetailBox"
import { ActionContainer, NftImage } from "."

interface DetailBoxProps {
  id: string
}

export const DetailBox = ({ id }: DetailBoxProps) => {
  const [boxWidth, setBoxWidth] = useState(0)
  const { isFetching, details, slot, setSlot, mutateMint, isLoading, router } = useDetailBox(id)
  const windowWidth = useWidth()
  // right UI info details
  const widthContainer = 800

  useEffect(() => {
    setBoxWidth(windowWidth.width - widthContainer)
  }, [windowWidth])
  return (
    <Flex flex={1} flexDir="column" align="center">
      <Flex w="full" flex={1} flexDir={["column", "row"]}>
        <Flex pos="fixed" top="4rem" left={0} zIndex={1} flexDir="column">
          <Box pt={8} px={8} w="full">
            <Button onClick={() => router.back()} pl={2} bg="white" rounded="full" alignItems="center">
              <Box color="neutral.500">
                <BiChevronLeft size="1.4rem" />
              </Box>
              <Text color="neutral.500">Back</Text>
            </Button>
          </Box>
        </Flex>
        <Box
          px={4}
          pos="fixed"
          top="60px"
          bottom="0"
          left="0"
          right={`${widthContainer}px`}
          display={["none", "none", "block"]}
          textAlign="center"
        >
          <NftImage
            pt={8}
            mintable={details?.mintable ?? 0}
            isFetching={isFetching}
            windowHeight={windowWidth.height}
            src={details?.propertyLootbox.image || ""}
            alt={"box"}
          />
        </Box>
        <Flex flex={1} pl={[0, `${boxWidth - 8}px`]} flexDir="column">
          <Box flex={1} py={8} px={[4, 0]}>
            <Box mb={4} display={["block", "block", "none"]} textAlign="center">
              <NftImage
                mintable={details?.mintable ?? 0}
                isFetching={isFetching}
                src={details?.propertyLootbox.image || ""}
                alt={"box"}
              />
            </Box>
            <Box maxWidth={`${widthContainer}px`} flex={1}>
              <HeaderDetails details={details} isFetching={isFetching} />
              <ContentDetails description={details?.propertyLootbox.description ?? ""} isFetching={isFetching} />
            </Box>
          </Box>
          <ActionContainer
            isFetching={isFetching}
            details={details}
            slot={slot}
            setSlot={setSlot}
            mutateMint={mutateMint}
            isLoading={isLoading}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
