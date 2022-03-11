import React from "react"
import { Avatar, Box, Flex, Heading, Text, Wrap, WrapItem } from "@sipher.dev/sipher-ui"

const contentWhatSpaceships = [
  {
    title: "Resource Capacity",
    text: "Provides you with space to carry the various resources throughout your journey within the World of Sipheria.",
  },
  {
    title: "Travel Requirement",
    text: "Allowing you to travel to certain worlds, requiring certain parts depending on the climate and atmosphere.",
  },
  {
    title: "Resource Gathering",
    text: "Send your Spaceship to other worlds on auto-pilot to gather extra resources.",
  },
  {
    title: "Progression Safety",
    text: "Keep the progress of your current dungeon if you die.",
  },
  {
    title: "Character Stat-boost",
    text: "You can equip full-set Spaceships that will further boost the stats of your character. Each Ship type boosts a different in-game stat.",
  },
  {
    title: "Visual Flair",
    text: "Show off your Ship to other players as you swoop into a dungeon, or if they look into your user profile.",
  },
]

export const WhatSpaceship = () => {
  return (
    <Flex
      pos="relative"
      flexDir="column"
      align="center"
      h="100vh"
      w="full"
      bg="url(/images/spaceship/bg-galaxy2.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Box
        pos="absolute"
        top="0"
        left="0"
        h="100vh"
        w="full"
        bgGradient="linear(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)"
      />
      <Flex flexDir="column" align="center" zIndex={2} pt={24} pb={16} maxW="1200px" w="full">
        <Heading mb={4} fontWeight={600} fontSize="3xl">
          What are Spaceships?
        </Heading>
        <Text color="neutral.100">
          Spaceships are your very own travel vehicle that will allow you to transport yourself
        </Text>
        <Text mb={12} color="neutral.100">
          throughout the various dungeons and the World of Sipheria.
        </Text>
        <Wrap spacing={16}>
          {contentWhatSpaceships.map(item => (
            <WrapItem flex="1 1 20rem" key={item.title}>
              <Flex flexDir="column" align="center">
                <Avatar bg="whiteAlpha.50" />
                <Text fontSize="lg" fontWeight={600} py={4}>
                  {item.title}
                </Text>
                <Text color="neutral.200" textAlign="center">
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