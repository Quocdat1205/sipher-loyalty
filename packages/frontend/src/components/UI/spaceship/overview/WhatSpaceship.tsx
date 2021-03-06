import React from "react"
import { Avatar, Box, Flex, Heading, Text, Wrap, WrapItem } from "@sipher.dev/sipher-ui"

const contentWhatSpaceships = [
  {
    title: "Resource Capacity",
    text: "Provides you with space to carry the various resources throughout your journey within the World of Sipheria.",
    img: "img1.png",
  },
  {
    title: "Travel Requirement",
    text: "Allowing you to travel to certain worlds, requiring certain parts depending on the climate and atmosphere.",
    img: "img2.png",
  },
  {
    title: "Resource Gathering",
    text: "Send your Spaceship to other worlds on auto-pilot to gather extra resources.",
    img: "img3.png",
  },
  {
    title: "Progression Safety",
    text: "Keep the progress of your current dungeon if you die.",
    img: "img4.png",
  },
  {
    title: "Character Stat-boost",
    text: "You can equip full-set Spaceships that will further boost the stats of your character. Each Ship type boosts a different in-game stat.",
    img: "img5.png",
  },
  {
    title: "Visual Flair",
    text: "Show off your Ship to other players as you swoop into a dungeon, or if they look into your user profile.",
    img: "img6.png",
  },
]

export const WhatSpaceship = () => {
  return (
    <Flex
      pos="relative"
      flexDir="column"
      align="center"
      w="full"
      bgRepeat="no-repeat"
      bgSize="cover"
      px={[4, 4, 4, 0, 0]}
      bg="black"
    >
      <Box
        pos="absolute"
        top="0"
        left="0"
        h="full"
        w="full"
        bgGradient="linear(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)"
      />
      <Flex flexDir="column" zIndex={2} py={24} maxW="1200px" w="full">
        <Heading textTransform="uppercase" mb={4} fontWeight={600} fontSize="5xl">
          What are Spaceships?
        </Heading>
        <Text color="neutral.100" fontSize={"lg"}>
          Spaceships are your very own travel vehicle that will allow you to transport yourself
        </Text>
        <Text mb={16} color="neutral.100" fontSize={"lg"}>
          throughout the various dungeons and the World of Sipheria.
        </Text>
        <Wrap mb={[16, 16, 24, 24, 24]} spacing={16}>
          {contentWhatSpaceships.map(item => (
            <WrapItem flex="1 1 20rem" key={item.title}>
              <Flex w="full" align={["center", "center", "flex-start"]} flexDir="column">
                <Avatar src={`/images/spaceship/${item.img}`} bg="whiteAlpha.50" size="lg" />
                <Text fontSize="lg" fontWeight={600} py={4}>
                  {item.title}
                </Text>
                <Text textAlign={["center", "center", "left"]} color="neutral.200">
                  {item.text}
                </Text>
              </Flex>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Flex>
  )
}
