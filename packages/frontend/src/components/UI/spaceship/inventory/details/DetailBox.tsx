import React, { useEffect, useState } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { Box, Button, Flex, Text } from "@sipher.dev/sipher-ui"

import { useWidth } from "@hooks"

import CountDown from "../../CountDown"

import { ContentDetails } from "./ContentDetails"
import { HeaderDetails } from "./HeaderDetails"
import { useDetailBox } from "./useDetailBox"
import { ActionContainer, NftImage } from "."

interface DetailBoxProps {
  id: string
}

export const DetailBox = ({ id }: DetailBoxProps) => {
  const [boxWidth, setBoxWidth] = useState(0)
  const {
    isFetched,
    details,
    slot,
    setSlot,
    mutateMint,
    isLoading,
    router,
    status,
    setStatus,
    mintedData,
    handleClick,
  } = useDetailBox(id)
  const windowWidth = useWidth()
  // right UI info details
  const widthContainer = 800

  useEffect(() => {
    setBoxWidth(windowWidth.width - widthContainer)
  }, [windowWidth])
  return (
    <Flex flex={1} flexDir="column" align="center">
      <Flex pos="relative" w="full" flex={1} flexDir={["column", "row"]}>
        <Flex pos="fixed" top="4rem" left={0} zIndex={1} flexDir="column">
          <Box pt={8} px={8} w="full">
            <Button
              role="group"
              _hover={{ color: "white", bg: "neutral.600" }}
              onClick={() => router.push(`/spaceship?tab=inventory`)}
              pl={2}
              bg="white"
              rounded="full"
              alignItems="center"
            >
              <Box _groupHover={{ color: "white" }} color="neutral.500">
                <BiChevronLeft size="1.4rem" />
              </Box>
              <Text _groupHover={{ color: "white" }} color="neutral.500">
                Back
              </Text>
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
            isFetching={isFetched}
            windowHeight={windowWidth.height}
            src={details?.propertyLootbox.image || ""}
            alt={"box"}
          />
          <Box pos="absolute" bottom="1rem" left="50%" zIndex={1} transform="translate(-50% ,-50%)">
            <Text fontSize="sm" color="neutral.400" fontWeight={600}>
              Reveal Date
            </Text>
            <CountDown fontWeight={600} deadline={1650024000000} />
          </Box>
        </Box>
        <Flex flex={1} pl={[0, `${boxWidth - 8}px`]} flexDir="column">
          <Box flex={1} py={8} px={[4, 0]}>
            <Box mb={4} display={["block", "block", "none"]} textAlign="center">
              <NftImage
                mintable={details?.mintable ?? 0}
                isFetching={isFetched}
                src={details?.propertyLootbox.image || ""}
                alt={"box"}
              />
            </Box>
            <Box maxWidth={`${widthContainer}px`} flex={1}>
              <HeaderDetails details={details} isFetching={isFetched} />
              <ContentDetails isFetching={isFetched} />
            </Box>
          </Box>
          <ActionContainer
            handleClick={handleClick}
            mintedData={mintedData}
            status={status}
            setStatus={setStatus}
            isFetching={isFetched}
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
